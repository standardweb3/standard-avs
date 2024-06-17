import { ERC20ABI } from "../abis/erc20ABI";
import { MMServiceManagerABI } from "../abis/mmServiceManagerABI";
import { WETH } from "../consts";
import { privateKeyToAccount } from "viem/accounts";

export const requiresETHToOrder = async (
  isBid: boolean,
  context: any,
  pair: any
) => {
  if (isBid) {
    if (WETH[context.network.chainId] === pair!.quote) {
      return true;
    }
  } else {
    if (WETH[context.network.chainId] === pair!.base) {
      return true;
    }
  }
  return false;
};

export const getPairBalance = async (
  isBid: boolean,
  context: any,
  pair: any
) => {
  if (isBid) {
    if (WETH[context.network.chainId] !== pair!.quote) {
      // match asks with quote token
      const quoteBalance = context.client.readContract({
        address: pair!.quote as `0x${string}`,
        abi: ERC20ABI,
        functionName: "balanceOf",
        args: ["0x0000000000000000000000000000000000000000"],
      });
      return quoteBalance;
    } else {
      const ETHBalance = context.client.getBalance({
        address: "0x0000000000000000000000000000000000000000",
      });
      return ETHBalance;
    }
  } else {
    if (WETH[context.network.chainId] !== pair!.base) {
      // match asks with quote token
      const baseBalance = context.client.readContract({
        address: pair!.base as `0x${string}`,
        abi: ERC20ABI,
        functionName: "balanceOf",
        args: ["0x0000000000000000000000000000000000000000"],
      });
      return baseBalance;
    } else {
      const ETHBalance = context.client.getBalance({
        address: "0x0000000000000000000000000000000000000000",
      });
      return ETHBalance;
    }
  }
};

export const transferETHAllowingFail = async (
  privateKey: string,
  context: any,
  to: string
) => {
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  try {
    const tx = await context.client.writeContract({
      address: to as `0x${string}`,
      abi: ERC20ABI,
      functionName: "transfer",
      args: [
        "0x0000000000000000000000000000000000000000",
        "0xffffffffffffffffffffffffffffffffffffffff",
      ],
      account,
    });
    return tx;
  } catch (error) {
    console.log(error);
  }
};

export const writeContractAllowingFail = async (
  privateKey: string,
  context: any,
  address: `0x${string}`,
  abi: any,
  functionName: string,
  args: any[],
  value: BigInt
) => {
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  try {
    const tx = await context.client.writeContract({
      address,
      abi,
      functionName,
      args,
      value,
      account,
    });
    return tx;
  } catch (error) {
    console.log(error);
  }
};

export const respondToTask = async (
  pair: any,
  context: any,
  serviceManager: `0x${string}`,
  referenceTaskIndex: number,
  isBid: boolean,
  price: BigInt,
  amount: BigInt,
  n: number
) => {
  if (await requiresETHToOrder(isBid, context, pair)) {
    await writeContractAllowingFail(
      process.env.PRIVATEKEY as string,
      context,
      serviceManager,
      MMServiceManagerABI,
      "respondToTaskETH",
      [referenceTaskIndex, isBid, price, amount, n],
      amount
    );
  } else {
    await writeContractAllowingFail(
      process.env.PRIVATEKEY as string,
      context,
      serviceManager,
      MMServiceManagerABI,
      "respondToTask",
      [referenceTaskIndex, isBid, price, amount, n],
      BigInt(0)
    );
  }
};
