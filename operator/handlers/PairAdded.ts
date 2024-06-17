export const PairAddedHandleTokenPairOrderbook = async (
  event: any,
  chainId: any,
  Analysis: any,
  Token: any,
  Pair: any,
) => {

  await Analysis.upsert({
    id: chainId,
    create: {
      totalTrades: 0,
      totalPairs: 1
    },
    // @ts-ignore
    update: ({ current }) => ({
      totalPairs: current.totalPairs + 1
    })
  });
  
  
  await Token.upsert({
    id: event.args.base,
    create: {
      price: 0,
      cgPrice: 0.0,
      cgId: "",
    }
  });
  await Token.upsert({
    id: event.args.quote,
    create: {
      price: 0,
      cgPrice: 0.0,
      cgId: "",
    }
  });

  const id = event.args.orderbook;

  await Pair.create({
    id,
    data: {
      base: event.args.base,
      quote: event.args.quote,
      orderbook: event.args.orderbook,
      bDecimal: event.args.bDecimal,
      qDecimal: event.args.qDecimal,
    },
  });
};
