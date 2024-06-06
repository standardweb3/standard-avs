import { formatUnits } from "viem";

export const OrderCanceledHandleOrder = async (
  event: any,
  Account: any,
  pair: any,
  Order: any,
  OrderHistory: any
) => {
  const id = event.args.owner
    .concat("-")
    .concat(event.args.orderbook)
    .concat("-")
    .concat(event.args.isBid.toString())
    .concat("-")
    .concat(event.args.id.toString());

  const canceled = await OrderHistory.findUnique({
    id,
  });

  const amountD = getVolume(event.args.isBid, event.args.amount, pair.bDecimal, pair.qDecimal);

  if (canceled!.amount - amountD <= 0) {
    await OrderHistory.delete({
      id,
    });
  } else {
    await OrderHistory.update({
      id,
      data: {
        amount: canceled!.amount - amountD,
      },
    });
  }

  await Account.update({
    id: event.args.owner,
    data: ({ current }: any) => ({
      orders: current.orders - 1,
      orderHistory: current.orderHistory - 1,
    }),
  });

  await Order.delete({
    id,
  });
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