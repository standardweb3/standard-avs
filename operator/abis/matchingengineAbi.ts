export const MatchingEngineABI = [
  { "type": "constructor", "inputs": [], "stateMutability": "nonpayable" },
  { "type": "receive", "stateMutability": "payable" },
  {
    "type": "function",
    "name": "DEFAULT_ADMIN_ROLE",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "WETH",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "addPair",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "book", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "cancelOrder",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "isBid", "type": "bool", "internalType": "bool" },
      { "name": "orderId", "type": "uint32", "internalType": "uint32" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" }
    ],
    "outputs": [
      { "name": "refunded", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "cancelOrders",
    "inputs": [
      { "name": "base", "type": "address[]", "internalType": "address[]" },
      { "name": "quote", "type": "address[]", "internalType": "address[]" },
      { "name": "isBid", "type": "bool[]", "internalType": "bool[]" },
      { "name": "orderIds", "type": "uint32[]", "internalType": "uint32[]" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" }
    ],
    "outputs": [
      { "name": "refunded", "type": "uint256[]", "internalType": "uint256[]" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "convert",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "amount", "type": "uint256", "internalType": "uint256" },
      { "name": "isBid", "type": "bool", "internalType": "bool" }
    ],
    "outputs": [
      { "name": "converted", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "feeDenom",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint32", "internalType": "uint32" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getBaseQuote",
    "inputs": [
      { "name": "orderbook", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMktPrices",
    "inputs": [
      { "name": "start", "type": "uint256", "internalType": "uint256" },
      { "name": "end", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      {
        "name": "mktPrices",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMktPricesWithIds",
    "inputs": [
      { "name": "ids", "type": "uint256[]", "internalType": "uint256[]" }
    ],
    "outputs": [
      {
        "name": "mktPrices",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOrder",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "isBid", "type": "bool", "internalType": "bool" },
      { "name": "orderId", "type": "uint32", "internalType": "uint32" }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ExchangeOrderbook.Order",
        "components": [
          { "name": "owner", "type": "address", "internalType": "address" },
          { "name": "price", "type": "uint256", "internalType": "uint256" },
          {
            "name": "depositAmount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOrderIds",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "isBid", "type": "bool", "internalType": "bool" },
      { "name": "price", "type": "uint256", "internalType": "uint256" },
      { "name": "n", "type": "uint32", "internalType": "uint32" }
    ],
    "outputs": [
      { "name": "", "type": "uint32[]", "internalType": "uint32[]" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOrderbookById",
    "inputs": [
      { "name": "id", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOrders",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "isBid", "type": "bool", "internalType": "bool" },
      { "name": "price", "type": "uint256", "internalType": "uint256" },
      { "name": "n", "type": "uint32", "internalType": "uint32" }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct ExchangeOrderbook.Order[]",
        "components": [
          { "name": "owner", "type": "address", "internalType": "address" },
          { "name": "price", "type": "uint256", "internalType": "uint256" },
          {
            "name": "depositAmount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOrdersPaginated",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "isBid", "type": "bool", "internalType": "bool" },
      { "name": "price", "type": "uint256", "internalType": "uint256" },
      { "name": "start", "type": "uint32", "internalType": "uint32" },
      { "name": "end", "type": "uint32", "internalType": "uint32" }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct ExchangeOrderbook.Order[]",
        "components": [
          { "name": "owner", "type": "address", "internalType": "address" },
          { "name": "price", "type": "uint256", "internalType": "uint256" },
          {
            "name": "depositAmount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPair",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "book", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPairNames",
    "inputs": [
      { "name": "start", "type": "uint256", "internalType": "uint256" },
      { "name": "end", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      { "name": "names", "type": "string[]", "internalType": "string[]" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPairNamesWithIds",
    "inputs": [
      { "name": "ids", "type": "uint256[]", "internalType": "uint256[]" }
    ],
    "outputs": [
      { "name": "names", "type": "string[]", "internalType": "string[]" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPairs",
    "inputs": [
      { "name": "start", "type": "uint256", "internalType": "uint256" },
      { "name": "end", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      {
        "name": "pairs",
        "type": "tuple[]",
        "internalType": "struct IOrderbookFactory.Pair[]",
        "components": [
          { "name": "base", "type": "address", "internalType": "address" },
          { "name": "quote", "type": "address", "internalType": "address" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPairsWithIds",
    "inputs": [
      { "name": "ids", "type": "uint256[]", "internalType": "uint256[]" }
    ],
    "outputs": [
      {
        "name": "pairs",
        "type": "tuple[]",
        "internalType": "struct IOrderbookFactory.Pair[]",
        "components": [
          { "name": "base", "type": "address", "internalType": "address" },
          { "name": "quote", "type": "address", "internalType": "address" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPrices",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "isBid", "type": "bool", "internalType": "bool" },
      { "name": "n", "type": "uint32", "internalType": "uint32" }
    ],
    "outputs": [
      { "name": "", "type": "uint256[]", "internalType": "uint256[]" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPricesPaginated",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "isBid", "type": "bool", "internalType": "bool" },
      { "name": "start", "type": "uint32", "internalType": "uint32" },
      { "name": "end", "type": "uint32", "internalType": "uint32" }
    ],
    "outputs": [
      { "name": "", "type": "uint256[]", "internalType": "uint256[]" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRoleAdmin",
    "inputs": [
      { "name": "role", "type": "bytes32", "internalType": "bytes32" }
    ],
    "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "grantRole",
    "inputs": [
      { "name": "role", "type": "bytes32", "internalType": "bytes32" },
      { "name": "account", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "hasRole",
    "inputs": [
      { "name": "role", "type": "bytes32", "internalType": "bytes32" },
      { "name": "account", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "heads",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "bidHead", "type": "uint256", "internalType": "uint256" },
      { "name": "askHead", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "orderbookFactory_",
        "type": "address",
        "internalType": "address"
      },
      { "name": "feeTo_", "type": "address", "internalType": "address" },
      { "name": "WETH_", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "limitBuy",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "price", "type": "uint256", "internalType": "uint256" },
      { "name": "quoteAmount", "type": "uint256", "internalType": "uint256" },
      { "name": "isMaker", "type": "bool", "internalType": "bool" },
      { "name": "n", "type": "uint32", "internalType": "uint32" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" },
      { "name": "recipient", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "makePrice", "type": "uint256", "internalType": "uint256" },
      { "name": "placed", "type": "uint256", "internalType": "uint256" },
      { "name": "id", "type": "uint32", "internalType": "uint32" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "limitBuyETH",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "price", "type": "uint256", "internalType": "uint256" },
      { "name": "isMaker", "type": "bool", "internalType": "bool" },
      { "name": "n", "type": "uint32", "internalType": "uint32" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" },
      { "name": "recipient", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "makePrice", "type": "uint256", "internalType": "uint256" },
      { "name": "placed", "type": "uint256", "internalType": "uint256" },
      { "name": "id", "type": "uint32", "internalType": "uint32" }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "limitSell",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "price", "type": "uint256", "internalType": "uint256" },
      { "name": "baseAmount", "type": "uint256", "internalType": "uint256" },
      { "name": "isMaker", "type": "bool", "internalType": "bool" },
      { "name": "n", "type": "uint32", "internalType": "uint32" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" },
      { "name": "recipient", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "makePrice", "type": "uint256", "internalType": "uint256" },
      { "name": "placed", "type": "uint256", "internalType": "uint256" },
      { "name": "id", "type": "uint32", "internalType": "uint32" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "limitSellETH",
    "inputs": [
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "price", "type": "uint256", "internalType": "uint256" },
      { "name": "isMaker", "type": "bool", "internalType": "bool" },
      { "name": "n", "type": "uint32", "internalType": "uint32" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" },
      { "name": "recipient", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "makePrice", "type": "uint256", "internalType": "uint256" },
      { "name": "placed", "type": "uint256", "internalType": "uint256" },
      { "name": "id", "type": "uint32", "internalType": "uint32" }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "marketBuy",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "quoteAmount", "type": "uint256", "internalType": "uint256" },
      { "name": "isMaker", "type": "bool", "internalType": "bool" },
      { "name": "n", "type": "uint32", "internalType": "uint32" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" },
      { "name": "recipient", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "makePrice", "type": "uint256", "internalType": "uint256" },
      { "name": "placed", "type": "uint256", "internalType": "uint256" },
      { "name": "id", "type": "uint32", "internalType": "uint32" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "marketBuyETH",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "isMaker", "type": "bool", "internalType": "bool" },
      { "name": "n", "type": "uint32", "internalType": "uint32" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" },
      { "name": "recipient", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "makePrice", "type": "uint256", "internalType": "uint256" },
      { "name": "placed", "type": "uint256", "internalType": "uint256" },
      { "name": "id", "type": "uint32", "internalType": "uint32" }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "marketSell",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "baseAmount", "type": "uint256", "internalType": "uint256" },
      { "name": "isMaker", "type": "bool", "internalType": "bool" },
      { "name": "n", "type": "uint32", "internalType": "uint32" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" },
      { "name": "recipient", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "makePrice", "type": "uint256", "internalType": "uint256" },
      { "name": "placed", "type": "uint256", "internalType": "uint256" },
      { "name": "id", "type": "uint32", "internalType": "uint32" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "marketSellETH",
    "inputs": [
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "isMaker", "type": "bool", "internalType": "bool" },
      { "name": "n", "type": "uint32", "internalType": "uint32" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" },
      { "name": "recipient", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "makePrice", "type": "uint256", "internalType": "uint256" },
      { "name": "placed", "type": "uint256", "internalType": "uint256" },
      { "name": "id", "type": "uint32", "internalType": "uint32" }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "mktPrice",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "orderbookFactory",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "rematchOrder",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "price", "type": "uint256", "internalType": "uint256" },
      { "name": "isBid", "type": "bool", "internalType": "bool" },
      { "name": "orderId", "type": "uint32", "internalType": "uint32" },
      { "name": "isMarket", "type": "bool", "internalType": "bool" },
      { "name": "isMaker", "type": "bool", "internalType": "bool" },
      { "name": "n", "type": "uint32", "internalType": "uint32" },
      { "name": "uid", "type": "uint32", "internalType": "uint32" }
    ],
    "outputs": [
      { "name": "makePrice", "type": "uint256", "internalType": "uint256" },
      { "name": "matched", "type": "uint256", "internalType": "uint256" },
      { "name": "placed", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceRole",
    "inputs": [
      { "name": "role", "type": "bytes32", "internalType": "bytes32" },
      { "name": "account", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revokeRole",
    "inputs": [
      { "name": "role", "type": "bytes32", "internalType": "bytes32" },
      { "name": "account", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setFeeTo",
    "inputs": [
      { "name": "feeTo_", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setSpread",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "market", "type": "uint32", "internalType": "uint32" },
      { "name": "limit", "type": "uint32", "internalType": "uint32" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "spreadLimits",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [
      { "name": "limit", "type": "uint32", "internalType": "uint32" },
      { "name": "market", "type": "uint32", "internalType": "uint32" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "supportsInterface",
    "inputs": [
      { "name": "interfaceId", "type": "bytes4", "internalType": "bytes4" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "Initialized",
    "inputs": [
      {
        "name": "version",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OrderCanceled",
    "inputs": [
      {
        "name": "orderbook",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "id",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "isBid",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      },
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OrderDeposit",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "fee",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OrderMatched",
    "inputs": [
      {
        "name": "orderbook",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "id",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "isBid",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      },
      {
        "name": "sender",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "owner",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "price",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "clear",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OrderPlaced",
    "inputs": [
      {
        "name": "orderbook",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "id",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "owner",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "isBid",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      },
      {
        "name": "price",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "withoutFee",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "placed",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PairAdded",
    "inputs": [
      {
        "name": "orderbook",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "base",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "quote",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "bDecimal",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      },
      {
        "name": "qDecimal",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleAdminChanged",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "previousAdminRole",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "newAdminRole",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleGranted",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "sender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleRevoked",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "sender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "AskPriceTooHigh",
    "inputs": [
      { "name": "limitPrice", "type": "uint256", "internalType": "uint256" },
      { "name": "lmp", "type": "uint256", "internalType": "uint256" },
      { "name": "maxAskPrice", "type": "uint256", "internalType": "uint256" }
    ]
  },
  {
    "type": "error",
    "name": "BidPriceTooLow",
    "inputs": [
      { "name": "limitPrice", "type": "uint256", "internalType": "uint256" },
      { "name": "lmp", "type": "uint256", "internalType": "uint256" },
      { "name": "minBidPrice", "type": "uint256", "internalType": "uint256" }
    ]
  },
  {
    "type": "error",
    "name": "InvalidFeeRate",
    "inputs": [
      { "name": "feeNum", "type": "uint256", "internalType": "uint256" },
      { "name": "feeDenom", "type": "uint256", "internalType": "uint256" }
    ]
  },
  {
    "type": "error",
    "name": "InvalidPair",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "pair", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "InvalidRole",
    "inputs": [
      { "name": "role", "type": "bytes32", "internalType": "bytes32" },
      { "name": "sender", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "NoLastMatchedPrice",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "NoOrderMade",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "NotContract",
    "inputs": [
      { "name": "newImpl", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "OrderSizeTooSmall",
    "inputs": [
      { "name": "amount", "type": "uint256", "internalType": "uint256" },
      { "name": "minRequired", "type": "uint256", "internalType": "uint256" }
    ]
  },
  {
    "type": "error",
    "name": "PairDoesNotExist",
    "inputs": [
      { "name": "base", "type": "address", "internalType": "address" },
      { "name": "quote", "type": "address", "internalType": "address" },
      { "name": "pair", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "TooManyMatches",
    "inputs": [{ "name": "n", "type": "uint256", "internalType": "uint256" }]
  }
] as const;