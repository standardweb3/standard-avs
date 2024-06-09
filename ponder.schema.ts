import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  AgentTask: p.createTable({
    /// task hash
    id: p.string(),
    /// task name
    name: p.string(),
    /// managing base asset
    base: p.string(),
    /// managing quote asset
    quote: p.string(),
    /// agents which works on it
    agents: p.string().references("Agent.id")
  }),
  Agent: p.createTable({
    id: p.string(),
    name: p.string(),
    assignedTasks: p.string().references("AgentTask.id")
  }),
  Analysis: p.createTable({
    id: p.int(),
    totalTrades: p.int(),
    totalPairs: p.int(),
  }),
  PointAccount : p.createTable({
    id: p.string(),
    points: p.float(),
  }),
  PointDay: p.createTable({
    id: p.string(),
    totalGenerated: p.float()
  }),
  PairPoint: p.createTable({
    id: p.string(),
    multiplier: p.float(),
    pointsGenerated: p.float()
  }),
  MinBucket: p.createTable({
    /// {base address}-{quote address}-{min}
    id: p.string(),
    /// base address
    base: p.string(),
    /// quote address
    quote: p.string(),
    /// orderbook contract address
    orderbook: p.string().references("Pair.id"),
    /// open price in 1 min related to asset
    open: p.float(),
    /// high price in 1 min related to asset
    high: p.float(),
    /// low price in 1 min related to asset
    low: p.float(),
    /// close price in 1 min related to asset
    close: p.float(),
    /// average price in 1 min related to asset
    average: p.float(),
    /// volume in 1 min for base asset
    baseVolume: p.float(),
    /// volume in 1 min for quote asset
    quoteVolume: p.float(),
    /// trade count
    count: p.int(),
    /// aggregated timestamp in 1 min in seconds
    timestamp: p.int()
  }),
  HourBucket: p.createTable({
    /// {base address}-{quote address}-{hour}
    id: p.string(),
    /// base address
    base: p.string(),
    /// quote address
    quote: p.string(),
    /// orderbook contract address
    orderbook: p.string().references("Pair.id"),
    /// open price in 24 hours related to asset
    open: p.float(),
    /// high price in 24 hours related to asset
    high: p.float(),
    /// low price in 24 hours related to asset
    low: p.float(),
    /// close price in 24 hours related to asset
    close: p.float(),
    /// average price in 1 min related to asset
    average: p.float(),
    /// volume in 1 min for base asset
    baseVolume: p.float(),
    /// volume in 1 min for quote asset
    quoteVolume: p.float(),
    /// trade count
    count: p.int(),
    /// aggregated timestamp in 1 hour in seconds
    timestamp: p.int()
  }),
  DayBucket: p.createTable({
    /// {base address}-{quote address}-{hour}
    id: p.string(),
    /// base address
    base: p.string(),
    /// quote address
    quote: p.string(),
    /// orderbook contract address
    orderbook: p.string().references("Pair.id"),
    /// open price in 24 hours related to asset
    open: p.float(),
    /// high price in 24 hours related to asset
    high: p.float(),
    /// low price in 24 hours related to asset
    low: p.float(),
    /// close price in 24 hours related to asset
    close: p.float(),
    /// average price in 1 min related to asset
    average: p.float(),
    /// volume in 1 min for base asset
    baseVolume: p.float(),
    /// volume in 1 min for quote asset
    quoteVolume: p.float(),
    /// trade count
    count: p.int(),
    /// aggregated timestamp in 24 hours in seconds
    timestamp: p.int()
  }),
  Token: p.createTable({
    /// address of the token contract
    id: p.string(),
    /// price in DEX in USDT
    price: p.float(),
    /// Coingecko id
    cgId: p.string(),
    /// price in Coingecko
    cgPrice: p.float(),
    /// supported pairs as the base asset
    basePairs: p.many("Pair.base"),
    /// supported pairs as the quote asset
    quotePairs: p.many("Pair.quote"),
  }),
  Trade: p.createTable({
    /// identifier for a trade
    id: p.string(),
    /// order id which was matched
    orderId: p.bigint(),
    /// base info
    base: p.string(),
    /// quote info
    quote: p.string(),
    /// order type (bid(buy) if true, ask(sell) if false)
    isBid: p.boolean(),
    /// price in 8 decimals
    price: p.float(),
    /// traded base token amount on isBid == false, traded quote token amount on isBid == true
    amount: p.float(),
    /// submitted timestamp
    timestamp: p.bigint(),
    /// taker of the matched order in the orderbook
    taker: p.string(),
    /// maker of the matched order in the orderbook
    maker: p.string(),
    /// transaction hash
    txHash: p.string()
  }),
  Account: p.createTable({
    /// account wallet address
    id: p.string(),
    /// Last traded
    lastTraded: p.int(),
    /// bid orders that are placed by the account
    bidOrders: p.many("BidOrder.maker"),
    /// ask orders that are placed by the account
    askOrders: p.many("AskOrder.maker"),
    /// bid orders that are already matched or canceled
    bidOrderHistory: p.many("BidOrderHistory.maker"),
    /// ask orders that are already matched or canceled
    askOrderHistory: p.many("AskOrderHistory.maker"),
    /// total orders that a user has currently
    orders: p.int(),
    /// total order history that a user has currently
    orderHistory: p.int()
  }),
  Pair: p.createTable({
    /// orderbook contract address
    id: p.string(),
    /// base token address
    base: p.string().references("Token.id"),
    /// quote token address
    quote: p.string().references("Token.id"),
    /// orderbook contract address
    orderbook: p.string(),
    /// base token decimal
    bDecimal: p.int(),
    /// quote token decimal
    qDecimal: p.int(),
    /// placed bids
    bids: p.many("BidOrder.orderbook"),
    /// placed asks
    asks: p.many("AskOrder.orderbook"),
    /// buy history
    buys: p.many("BidOrderHistory.orderbook"),
    /// sell history
    sells: p.many("AskOrderHistory.orderbook"),
    /// aggregated info per min
    minBuckets: p.many("MinBucket.orderbook"),
    /// aggregated info per hour
    hourBuckets: p.many("HourBucket.orderbook"),
    /// aggregated info per day
    DayBuckets: p.many("DayBucket.orderbook")
  }),
  BidTradeHistory: p.createTable({
    // a unique identifier
    id: p.string(),
    /// placed order id
    orderId: p.bigint(),
    /// order type (bid(buy) if true, ask(sell) if false)
    isBid: p.boolean(),
    /// base token address
    base: p.string(),
    /// quote token address
    quote: p.string(),
    /// orderbook contract address
    orderbook: p.string().references("Pair.id"),
    /// price in 8 decimals
    price: p.float(),
    /// deposit asset amount
    amount: p.float(),
    /// submitted timestamp
    timestamp: p.bigint(),
    /// wallet address who made an order
    maker: p.string().references("Account.id"),
    /// wallet address who took an order
    taker: p.string().references("Account.id"),
    /// wallet address who send the transaction in an order
    account: p.string().references("Account.id"),
    /// transaction hash 
    txHash: p.string()
  }),
  AskTradeHistory: p.createTable({
    // a unique identifier
    id: p.string(),
    /// placed order id
    orderId: p.bigint(),
    /// order type (bid(buy) if true, ask(sell) if false)
    isBid: p.boolean(),
    /// base token address
    base: p.string(),
    /// quote token address
    quote: p.string(),
    /// orderbook contract address
    orderbook: p.string().references("Pair.id"),
    /// price in 8 decimals
    price: p.float(),
    /// deposit asset amount
    amount: p.float(),
    /// submitted timestamp
    timestamp: p.bigint(),
    /// wallet address who made an order
    maker: p.string().references("Account.id"),
    /// wallet address who took an order
    taker: p.string().references("Account.id"),
    /// wallet address who send the transaction in an order
    account: p.string().references("Account.id"),
    /// transaction hash
    txHash: p.string()
  }),
  BidOrderHistory: p.createTable({
    // a unique identifier
    id: p.string(),
    /// placed order id
    orderId: p.bigint(),
    /// order type (bid(buy) if true, ask(sell) if false)
    isBid: p.boolean(),
    /// base token address
    base: p.string(),
    /// quote token address
    quote: p.string(),
    /// orderbook contract address
    orderbook: p.string().references("Pair.id"),
    /// price in 8 decimals
    price: p.float(),
    /// deposit asset amount
    amount: p.float(),
    /// submitted timestamp
    timestamp: p.bigint(),
    /// wallet address who made an order
    maker: p.string().references("Account.id"),
    /// wallet address who took an order
    taker: p.string().references("Account.id"),
    /// wallet address who send the transaction in an order
    account: p.string().references("Account.id"),
    /// transaction hash 
    txHash: p.string()
  }),
  AskOrderHistory: p.createTable({
    // a unique identifier
    id: p.string(),
    /// placed order id
    orderId: p.bigint(),
    /// order type (bid(buy) if true, ask(sell) if false)
    isBid: p.boolean(),
    /// base token address
    base: p.string(),
    /// quote token address
    quote: p.string(),
    /// orderbook contract address
    orderbook: p.string().references("Pair.id"),
    /// price in 8 decimals
    price: p.float(),
    /// deposit asset amount
    amount: p.float(),
    /// submitted timestamp
    timestamp: p.bigint(),
    /// wallet address who made an order
    maker: p.string().references("Account.id"),
    /// wallet address who took an order
    taker: p.string().references("Account.id"),
    /// wallet address who send the transaction in an order
    account: p.string().references("Account.id"),
    /// transaction hash
    txHash: p.string()
  }),
  BidOrder: p.createTable({
    /// a unique identifier
    id: p.string(),
    /// order type (bid(buy) if true, ask(sell) if false)
    isBid: p.boolean(),
    /// placed order id
    orderId: p.bigint(),
    /// base token address
    base: p.string(),
    /// quote token address
    quote: p.string(),
    /// orderbook contract address
    orderbook: p.string().references("Pair.id"),
    /// price in 8 decimals
    price: p.float(),
    /// deposit asset amount
    amount: p.float(),
    /// placed asset amount
    placed: p.float(),
    /// submitted timestamp
    timestamp: p.bigint(),
    /// wallet address who made an order
    maker: p.string().references("Account.id"),
    /// transaction hash
    txHash: p.string()
  }),
  AskOrder: p.createTable({
    /// a unique identifier
    id: p.string(),
    /// order type (bid(buy) if true, ask(sell) if false)
    isBid: p.boolean(),
    /// placed order id
    orderId: p.bigint(),
    /// base token address
    base: p.string(),
    /// quote token address
    quote: p.string(),
    /// orderbook contract address
    orderbook: p.string().references("Pair.id"),
    /// price in 8 decimals
    price: p.float(),
    /// deposit asset amount
    amount: p.float(),
    /// placed asset amount
    placed: p.float(),
    /// submitted timestamp
    timestamp: p.bigint(),
    /// wallet address who made an order
    maker: p.string().references("Account.id"),
    /// transaction Hash
    txHash: p.string()
  }),
}));

