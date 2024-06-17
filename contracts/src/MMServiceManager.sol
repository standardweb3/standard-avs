// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@eigenlayer/contracts/libraries/BytesLib.sol";
import "@eigenlayer-middleware/src/unaudited/ECDSAServiceManagerBase.sol";
import "@eigenlayer-middleware/src/unaudited/ECDSAStakeRegistry.sol";
import "@openzeppelin-upgrades/contracts/utils/cryptography/ECDSAUpgradeable.sol";
import "@eigenlayer/contracts/permissions/Pausable.sol";
import {IRegistryCoordinator} from "@eigenlayer-middleware/src/interfaces/IRegistryCoordinator.sol";
import {TransferHelper} from "./libraries/TransferHelper.sol";
import {IEngine} from "./interfaces/IEngine.sol";

import "./IMMServiceManager.sol";

/**
 * @title Primary entrypoint for procuring services from HelloWorld.
 * @author Eigen Labs, Inc.
 */
contract MMServiceManager is
    ECDSAServiceManagerBase,
    IMMServiceManager,
    Pausable
{
    using BytesLib for bytes;
    using ECDSAUpgradeable for bytes32;

    bytes32 public constant MM_ROLE = keccak256("MM_ROLE");

    error InvalidAccess(bytes32 role, address account);

    /* STORAGE */
    // The latest task index
    uint32 public latestTaskNum;

    address matchingEngine;

    struct Pair {
        address base;
        address quote;
    }

    // mapping of task indices to all tasks hashes
    // when a task is created, task hash is stored here,
    // and responses need to pass the actual task,
    // which is hashed onchain and checked against this mapping
    mapping(uint32 => bytes32) public allTaskHashes;

    // mapping of task indices to hash of abi.encode(taskResponse, taskResponseMetadata)
    mapping(address => mapping(uint32 => bytes)) public allTaskResponses;

    // mapping of task id to assigned address of operator
    mapping(uint32 => mapping(address => bool)) public assigned;

    // mapping of each MM task's managing pair
    mapping(uint32 => Pair) public allManagingPairs;

    // mapping of MM task owners on task hash
    mapping(uint32 => address) public allTaskOwners;

    // event for agent registration on MM task
    event MMAgentRegistered(uint32 taskIndex, address agent);

    // event for agent penalty on MM task
    event MMAgentPenalized(uint32 taskIndex, address agent);

    /* MODIFIERS */
    modifier onlyOperator() {
        require(
            ECDSAStakeRegistry(stakeRegistry).operatorRegistered(msg.sender) ==
                true,
            "Operator must be the caller"
        );
        _;
    }

    constructor(
        address _avsDirectory,
        address _stakeRegistry,
        address _delegationManager
    )
        ECDSAServiceManagerBase(
            _avsDirectory,
            _stakeRegistry,
            address(0), // hello-world doesn't need to deal with payments
            _delegationManager
        )
    {}

    /* FUNCTIONS */
    // NOTE: this function creates new task, assigns it a taskId
    function createNewTask(
        string memory name,
        address base,
        address quote
    ) external {
        // create a new task struct
        Task memory newTask;
        newTask.name = name;
        newTask.taskCreatedBlock = uint32(block.number);

        // store hash of task onchain, emit event, and increase taskNum
        bytes32 taskHash = keccak256(abi.encode(newTask));
        allTaskHashes[latestTaskNum] = keccak256(abi.encode(newTask));
        allManagingPairs[latestTaskNum] = Pair({base: base, quote: quote});
        allTaskOwners[latestTaskNum] = msg.sender;
        emit NewTaskCreated(latestTaskNum, newTask, taskHash, base, quote);
        latestTaskNum = latestTaskNum + 1;
    }

    function addMMAgent(uint32 taskIndex, address agent) external {
        if (allTaskOwners[taskIndex] != msg.sender) {
            revert InvalidAccess(MM_ROLE, msg.sender);
        }
        Pair memory pair = allManagingPairs[taskIndex];
        TransferHelper.safeApprove(pair.base, address(this), type(uint256).max);
        TransferHelper.safeApprove(
            pair.quote,
            address(this),
            type(uint256).max
        );
        assigned[taskIndex][agent] = true;
        emit MMAgentRegistered(taskIndex, agent);
    }

    // NOTE: this function responds to existing tasks.
    function respondToTask(
        uint32 referenceTaskIndex,
        bool isBid,
        uint256 price,
        uint256 amount,
        uint32 n,
        bytes calldata signature
    ) external onlyOperator {
        // check that the task is valid, hasn't been responsed yet, and is being responded in time
        require(
            assigned[referenceTaskIndex][msg.sender],
            "supplied task is not assigned to you"
        );
        // some logical checks
        require(
            allTaskResponses[msg.sender][referenceTaskIndex].length == 0,
            "Operator has already responded to the task"
        );

        Pair memory pair = allManagingPairs[referenceTaskIndex];

        // Approve just in case approval amount has run out, later add check on allowance
        TransferHelper.safeApprove(pair.base, address(this), type(uint256).max);
        TransferHelper.safeApprove(
            pair.quote,
            address(this),
            type(uint256).max
        );

        // Execute trade
        TransferHelper.safeTransferFrom(
            isBid ? pair.quote : pair.base,
            msg.sender,
            address(this),
            amount
        );
        if (isBid) {
            IEngine(matchingEngine).limitBuy(
                pair.base,
                pair.quote,
                price,
                amount,
                true,
                n,
                0,
                msg.sender
            );
        } else {
            IEngine(matchingEngine).limitSell(
                pair.base,
                pair.quote,
                price,
                amount,
                true,
                n,
                0,
                msg.sender
            );
        }

        // updating the storage with task responsea
        allTaskResponses[msg.sender][referenceTaskIndex] = signature;

        bytes32 taskHash = allTaskHashes[referenceTaskIndex];

        // emitting event
        emit TaskResponded(referenceTaskIndex, taskHash, msg.sender);
    }

    function respondToTaskETH(
        uint32 referenceTaskIndex,
        bool isBid,
        uint256 price,
        uint256 amount,
        uint32 n
    ) external payable onlyOperator {

        // check that the task is valid, hasn't been responsed yet, and is being responded in time
        require(
            assigned[referenceTaskIndex][msg.sender],
            "supplied task does not match the one recorded in the contract"
        );
        // some logical checks
        /* TODO: add logical checks on spread for matching an order
        require(
            allTaskResponses[msg.sender][referenceTaskIndex].length == 0,
            "Operator has already responded to the task"
        );
        */

        Pair memory pair = allManagingPairs[referenceTaskIndex];

        // Approve just in case approval amount has run out, later add check on allowance
        TransferHelper.safeApprove(pair.base, address(this), type(uint256).max);
        TransferHelper.safeApprove(
            pair.quote,
            address(this),
            type(uint256).max
        );

        // Execute trade
        TransferHelper.safeTransferFrom(
            isBid ? pair.quote : pair.base,
            msg.sender,
            address(this),
            amount
        );
        if (isBid) {
            IEngine(matchingEngine).limitBuyETH{value: amount}(
                pair.base,
                price,
                true,
                n,
                0,
                msg.sender
            );
        } else {
            IEngine(matchingEngine).limitSellETH{value: amount}(
                pair.quote,
                price,
                true,
                n,
                0,
                msg.sender
            );
        }

        // updating the storage with task responsea
        // allTaskResponses[msg.sender][referenceTaskIndex] = signature;

        bytes32 taskHash = allTaskHashes[referenceTaskIndex];

        // emitting event
        emit TaskResponded(referenceTaskIndex, taskHash, msg.sender);
    }
}
