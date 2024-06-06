import { createConfig } from "@ponder/core";
import { http } from "viem";
import { MatchingEngineABI } from "./operator/abis/matchingengineAbi";

export default createConfig({
  networks: {
    deployed: {
      chainId: parseInt(process.env.CHAINID!),
      transport: http(process.env.RPC)
    }
  },
  contracts: {
    matchingEngine: {
      abi: MatchingEngineABI,
      address: process.env.CONTRACT as `0x${string}`,
      network: {
        deployed: {
          startBlock: parseInt(process.env.STARTBLOCK as string),
        }
      }
    }
  }
});
