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
} from "./utils";

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
    await OrderMatchedHandleOrder(event,  pair, Account, BidOrder, BidTradeHistory);
  } else {
    await OrderMatchedHandleOrder(event,  pair, Account, AskOrder, AskTradeHistory);
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
    Pair
  } = context.db;
  const pair = await Pair.findUnique({
    id: event.args.orderbook,
  })
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
