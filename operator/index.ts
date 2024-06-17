import { ponder } from "@/generated";

import { Knock } from "@knocklabs/node";
import {
  OrderCanceledHandleOrder,
  OrderMatchedHandleBuckets,
  OrderMatchedHandleOrder,
  OrderMatchedHandleTrade,
  OrderMatchedHandleToken,
  OrderPlacedHandleAccountOrders,
  PairAddedHandleTokenPairOrderbook,
} from "./handlers";
import { createOrder, getPairBalance, respondToTask } from "./onchain";
import { privateKeyToAccount } from "viem/accounts";
import { ServiceManager } from "./consts";

// const knock = new Knock(process.env.KNOCK_API_KEY);

ponder.on("matchingEngine:PairAdded", async ({ event, context }) => {
  const { Analysis, Token, Pair } = context.db;
  const chainId = context.network.chainId;
  await PairAddedHandleTokenPairOrderbook(
    event,
    chainId,
    Analysis,
    Token,
    Pair
  );
});

ponder.on("matchingEngine:OrderMatched", async ({ event, context }) => {
  const {
    BidOrder,
    AskOrder,
    BidTradeHistory,
    AskTradeHistory,
    Pair,
    DayBucket,
    HourBucket,
    MinBucket,
    Trade,
    Token,
    Account,
    Analysis,
  } = context.db;

  // Get Pair Info
  const pair = await Pair.findUnique({
    id: event.args.orderbook,
  });

  const chainId = context.network.chainId;

  // Update token info
  await OrderMatchedHandleToken(event, pair, chainId, Token);

  // Update trade info
  await OrderMatchedHandleTrade(event, chainId, Analysis, pair, Trade);

  // Update trade buckets
  await OrderMatchedHandleBuckets(
    event,
    pair,
    DayBucket,
    HourBucket,
    MinBucket
  );

  // Update recent transactions
  await OrderMatchedHandleTrade(event, chainId, Analysis, pair, Trade);

  // Update Order info
  // if matching order is buy
  if (!event.args.isBid) {
    await OrderMatchedHandleOrder(
      event,
      pair,
      Account,
      BidOrder,
      BidTradeHistory
    );
  } else {
    await OrderMatchedHandleOrder(
      event,
      pair,
      Account,
      AskOrder,
      AskTradeHistory
    );
  }
});

ponder.on("matchingEngine:OrderPlaced", async ({ event, context }) => {
  const {
    Account,
    BidOrder,
    AskOrder,
    Pair,
    BidOrderHistory,
    AskOrderHistory,
    Agent,
    AgentTask,
  } = context.db;
  const pair = await Pair.findUnique({
    id: event.args.orderbook,
  });

  if (event.args.isBid) {
    await OrderPlacedHandleAccountOrders(
      event,
      pair,
      Account,
      BidOrder,
      BidOrderHistory
    );

    // Get all tasks related to pair
    const tasks = await AgentTask.findMany({
      where: { base: pair!.base, quote: pair!.quote },
    });
    // if there is none, return
    if (tasks === null) return;

    // Get assigned agents from each task
    tasks.items.map(async (task) => {
      const agent = await Agent.findUnique({
       id: privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`).address.concat("-").concat(task.id.toString())
      })

      // if there is none, return
      if (agent === null) return;
      
      // respond to assigned task
      await respondToTask(pair, context, ServiceManager[context.network.chainId], agent!.assignedTask, event.args.isBid, event.args.price, event.args.placed, 1);

    });
  } else {
    await OrderPlacedHandleAccountOrders(
      event,
      pair,
      Account,
      AskOrder,
      AskOrderHistory
    );
  }
});

ponder.on("matchingEngine:OrderCanceled", async ({ event, context }) => {
  const {
    BidOrder,
    AskOrder,
    BidOrderHistory,
    AskOrderHistory,
    Account,
    Pair,
  } = context.db;
  const pair = await Pair.findUnique({
    id: event.args.orderbook,
  });
  if (event.args.isBid) {
    await OrderCanceledHandleOrder(
      event,
      Account,
      pair,
      BidOrder,
      BidOrderHistory
    );
  } else {
    await OrderCanceledHandleOrder(
      event,
      Account,
      pair,
      AskOrder,
      AskOrderHistory
    );
  }
});
