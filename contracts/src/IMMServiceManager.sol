// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IMMServiceManager {
    // EVENTS
    event NewTaskCreated(uint32 indexed taskIndex, Task task);

    event TaskResponded(uint32 indexed taskIndex, Task task, address operator);

    // STRUCTS
    struct Task {
        string name;
        uint32 taskCreatedBlock;
    }

    // FUNCTIONS
    // NOTE: this function creates new task.
    function createNewTask(string memory name, address base, address quote) external;

    // NOTE: this function is called by operators to respond to a task.
    function respondToTask(
        Task calldata task,
        uint32 referenceTaskIndex,
        bool isBid,
        uint256 price,
        uint256 amount,
        uint32 n,
        bytes calldata signature
    ) external;
}