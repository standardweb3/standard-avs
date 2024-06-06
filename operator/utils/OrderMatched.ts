import { formatUnits } from "viem";
import { Stablecoin } from "../consts/stablecoin";

export const OrderMatchedHandleToken = async (
  event: any,
  pair: any,
  chainId: any,
  BaseToken: any
) => {
  const id = pair.base;

  if (pair.quote === Stablecoin[chainId]) {
    const priceD = parseFloat(formatUnits(event.args.price, 8));
    BaseToken.update({
      id,
      data: {
        price: priceD,
      },
    });
  }
};

const getVolume = (
  isBid: any,
  amount: bigint,
  bDecimal: any,
  qDecimal: any
) => {
  if (isBid) {
    const quoteD = formatUnits(amount, qDecimal);
    return parseFloat(quoteD);
  } else {
    const baseD = formatUnits(amount, bDecimal);
    return parseFloat(baseD);
  }
};

const handleBucketInTime = async (
  event: any,
  pair: any,
  seconds: any,
  contextObj: any
) => {
  const secondsInBI = BigInt(seconds);
  const aggregatedTime = Math.floor(
    Number((event.block.timestamp / secondsInBI) * secondsInBI)
  );
  const id = pair!.base
    .concat("-")
    .concat(pair!.quote)
    .concat("-")
    .concat(aggregatedTime.toString());

  const priceD = parseFloat(formatUnits(event.args.price, 8));

  const matchedOrderType = event.args.isBid;

  // true then quote volume, false then base volume
  const volume = getVolume(
    matchedOrderType,
    event.args.amount,
    pair.bDecimal,
    pair.qDecimal
  );

  // true then base volume, false then quote volume
  const counterVolume =
    matchedOrderType == true ? volume / priceD : volume * priceD;

  const baseVolume = matchedOrderType == true ? counterVolume : volume;
  const quoteVolume = matchedOrderType == false ? counterVolume : volume;

  await contextObj.upsert({
    id,
    create: {
      orderbook: event.args.orderbook,
      base: pair.base,
      quote: pair.quote,
      open: priceD,
      close: priceD,
      low: priceD,
      high: priceD,
      average: priceD,
      count: 1,
      baseVolume,
      quoteVolume,
      timestamp: aggregatedTime,
    },
    update: ({ current }: any) => ({
      close: priceD,
      low: current.low > priceD ? priceD : current.low,
      high: current.high < priceD ? priceD : current.high,
      average: (current.average * current.count + priceD) / (current.count + 1),
      count: current.count + 1,
      baseVolume: current.baseVolume + baseVolume,
      quoteVolume: current.quoteVolume + quoteVolume,
    }),
  });
};

export const OrderMatchedHandleMinBuckets = async (
  event: any,
  pair: any,
  MinBucket: any
) => {
  await handleBucketInTime(event, pair, 60, MinBucket);
};

export const OrderMatchedHandleDayBuckets = async (
  event: any,
  pair: any,
  DayBucket: any
) => {
  await handleBucketInTime(event, pair, 60 * 60 * 24, DayBucket);
};

export const OrderMatchedHandleHourBuckets = async (
  event: any,
  pair: any,
  HourBucket: any
) => {
  await handleBucketInTime(event, pair, 60 * 60, HourBucket);
};

export const OrderMatchedHandleBuckets = async (
  event: any,
  pair: any,
  DayBucket: any,
  HourBucket: any,
  MinBucket: any
) => {
  await OrderMatchedHandleDayBuckets(event, pair, DayBucket);
  await OrderMatchedHandleHourBuckets(event, pair, HourBucket);
  await OrderMatchedHandleMinBuckets(event, pair, MinBucket);
};

export const OrderMatchedHandleTrade = async (
  event: any,
  chainId: any,
  Analysis: any,
  pair: any,
  Trade: any
) => {
  const id = pair!.base
    .concat("-")
    .concat(pair!.quote)
    .concat((!event.args.isBid).toString())
    .concat("-")
    .concat(event.args.id.toString());

  const priceD = parseFloat(formatUnits(event.args.price, 8));
  const amountD = getVolume(
    event.args.isBid,
    event.args.amount,
    pair.bDecimal,
    pair.qDecimal
  );

  // upsert Trade as the order rewrites on the id circulating with uint32.max
  await Trade.upsert({
    id,
    create: {
      orderId: event.args.id,
      base: pair!.base,
      quote: pair!.quote,
      isBid: event.args.isBid,
      price: priceD,
      amount: amountD,
      taker: event.args.sender,
      maker: event.args.owner,
      timestamp: event.block.timestamp,
      txHash: event.transaction.hash,
    },
    update: {
      orderId: event.args.id,
      base: pair!.base,
      quote: pair!.quote,
      isBid: event.args.isBid,
      price: priceD,
      amount: amountD,
      taker: event.args.sender,
      maker: event.args.owner,
      timestamp: event.block.timestamp,
      txHash: event.transaction.hash,
    },
  });

  await Analysis.upsert({
    id: chainId,
    create: {
      totalTrades: 1,
    },
    update: ({ current }: any) => ({
      totalTrades: current.totalTrades + 1,
    }),
  });
};

export const OrderMatchedHandleOrder = async (
  event: any,
  pair: any,
  Account: any,
  Order: any,
  TradeHistory: any
) => {
  const id = event.args.owner
    .concat("-")
    .concat(event.args.orderbook)
    .concat("-")
    .concat((!event.args.isBid).toString())
    .concat("-")
    .concat(event.args.id.toString());

  const order = await Order.findUnique({
    id,
  });

  // if isBid is true, quote amount is in event, if isBid is false, base amount is in event
  // the amount to match with in case of isBid=true is baseAmount, the amount to match with in case of isBid=false is quoteAmount
  // normalize the amount with appropriate decimal
  const normalized = getVolume(
    event.args.isBid,
    event.args.amount,
    pair.bDecimal,
    pair.qDecimal
  );
  const decrease = event.args.isBid
    ? normalized / order.price
    : normalized * order.price;

  if (event.args.clear) {
    await Order.delete({
      id,
    });
    Account.update({
      id: event.args.owner,
      data: ({ current }: any) => ({
        orders: current.orders - 1,
      }),
    });
  } else {
    await Order.update({
      id,
      data: {
        placed: order.amount <= decrease ? order.amount - decrease : 0.001,
        timestamp: event.block.timestamp,
      },
    });
  }

  const historyId = event.args.owner
    .concat("-")
    .concat(event.args.orderbook)
    .concat("-")
    .concat(event.args.isBid.toString())
    .concat("-")
    .concat(event.args.id.toString())
    .concat("-")
    .concat(event.transaction.hash.toString());

  // add matched order to order history
  await TradeHistory.upsert({
    id: historyId,
    create: {
      orderId: event.args.id,
      base: pair!.base,
      quote: pair!.quote,
      isBid: event.args.isBid,
      orderbook: event.args.orderbook,
      price: order.price,
      amount: normalized,
      taker: event.args.sender,
      maker: event.args.owner,
      account: event.args.sender,
      timestamp: event.block.timestamp,
      txHash: event.transaction.hash,
    },
    update: {
      orderId: event.args.id,
      base: pair!.base,
      quote: pair!.quote,
      isBid: event.args.isBid,
      orderbook: event.args.orderbook,
      price: order.price,
      amount: normalized,
      taker: event.args.sender,
      maker: event.args.owner,
      account: event.args.sender,
      timestamp: event.block.timestamp,
      txHash: event.transaction.hash,
    },
  });
};
