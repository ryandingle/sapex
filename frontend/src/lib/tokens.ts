export interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  icon: string
  chain?: 'ethereum' | 'ronin' // Optional chain specification
}

// Get PHPC token address from environment (Ronin network)
// Official PHPC contract address on Ronin: 0x63c6e9f027947be84d390cfa7b2332d13b529353
function getPhpcTokenAddress(): string {
  // In Next.js, we can access public env vars directly
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_PHPC_TOKEN_ADDRESS) {
    return process.env.NEXT_PUBLIC_PHPC_TOKEN_ADDRESS
  }
  // Default to official PHPC contract address on Ronin
  // Source: https://support.coins.ph/hc/en-us/articles/38460014842649
  return '0x63c6e9f027947be84d390cfa7b2332d13b529353'
}

export const SUPPORTED_TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: 'native',
    decimals: 18,
    icon: 'Ξ',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6,
    icon: '$',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    icon: '$',
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    decimals: 8,
    icon: '₿',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    icon: '$',
  },
  {
    symbol: 'PHPC',
    name: 'Philippine Peso Coin',
    address: getPhpcTokenAddress(), // Set NEXT_PUBLIC_PHPC_TOKEN_ADDRESS in .env.local
    decimals: 18,
    icon: '₱',
    chain: 'ronin', // PHPC is on Ronin network
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    decimals: 18,
    icon: '🦄',
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    decimals: 18,
    icon: '🔗',
  },
  {
    symbol: 'AAVE',
    name: 'Aave',
    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    decimals: 18,
    icon: '👻',
  },
  {
    symbol: 'CRV',
    name: 'Curve DAO Token',
    address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    decimals: 18,
    icon: '🌀',
  },
  {
    symbol: 'MKR',
    name: 'Maker',
    address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    decimals: 18,
    icon: '⚙️',
  },
  {
    symbol: 'SNX',
    name: 'Synthetix Network Token',
    address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
    decimals: 18,
    icon: '💎',
  },
  {
    symbol: 'COMP',
    name: 'Compound',
    address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
    decimals: 18,
    icon: '🏦',
  },
  {
    symbol: 'SUSHI',
    name: 'SushiSwap',
    address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
    decimals: 18,
    icon: '🍣',
  },
  {
    symbol: '1INCH',
    name: '1inch Network',
    address: '0x111111111117dC0aa78b770fA6A738034120C302',
    decimals: 18,
    icon: '1️⃣',
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    decimals: 18,
    icon: '🔷',
  },
  {
    symbol: 'SHIB',
    name: 'Shiba Inu',
    address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    decimals: 18,
    icon: '🐕',
  },
  {
    symbol: 'PEPE',
    name: 'Pepe',
    address: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
    decimals: 18,
    icon: '🐸',
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: 18,
    icon: 'Ξ',
  },
  {
    symbol: 'stETH',
    name: 'Lido Staked Ether',
    address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    decimals: 18,
    icon: '💎',
  },
  {
    symbol: 'FRAX',
    name: 'Frax',
    address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
    decimals: 18,
    icon: '💵',
  },
  {
    symbol: 'TUSD',
    name: 'TrueUSD',
    address: '0x0000000000085d4780B73119b644AE5ecd22b376',
    decimals: 18,
    icon: '$',
  },
  {
    symbol: 'BUSD',
    name: 'Binance USD',
    address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
    decimals: 18,
    icon: '$',
  },
  {
    symbol: 'APE',
    name: 'ApeCoin',
    address: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
    decimals: 18,
    icon: '🦍',
  },
  {
    symbol: 'GRT',
    name: 'The Graph',
    address: '0xc944E90C64B2c07662A292be6244BDf05Cda44a7',
    decimals: 18,
    icon: '📊',
  },
  {
    symbol: 'ENS',
    name: 'Ethereum Name Service',
    address: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    decimals: 18,
    icon: '🌐',
  },
  {
    symbol: 'LDO',
    name: 'Lido DAO',
    address: '0x5A98FcBEA516068068C8e0fA80b73faA6847e08f',
    decimals: 18,
    icon: '🏛️',
  },
  {
    symbol: 'ARB',
    name: 'Arbitrum',
    address: '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1',
    decimals: 18,
    icon: '🔷',
  },
  {
    symbol: 'OP',
    name: 'Optimism',
    address: '0x4200000000000000000000000000000000000042',
    decimals: 18,
    icon: '⚡',
  },
  {
    symbol: 'rETH',
    name: 'Rocket Pool ETH',
    address: '0xae78736Cd615f374D3085123A210448E74Fc6393',
    decimals: 18,
    icon: '🚀',
  },
  {
    symbol: 'YFI',
    name: 'yearn.finance',
    address: '0x0bc529c00C6401aEF6D220BE8c6Ea1667F6Ad93e',
    decimals: 18,
    icon: '💰',
  },
  {
    symbol: 'RPL',
    name: 'Rocket Pool',
    address: '0xD33526068D116cE69F19A9ee46F0bd304F21A51f',
    decimals: 18,
    icon: '🚀',
  },
  {
    symbol: 'LRC',
    name: 'Loopring',
    address: '0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD',
    decimals: 18,
    icon: '🔄',
  },
  {
    symbol: 'FTM',
    name: 'Fantom',
    address: '0x4E15361FD6b4BB609Fa63C81A2be19d873717870',
    decimals: 18,
    icon: '👻',
  },
  {
    symbol: 'cbETH',
    name: 'Coinbase Wrapped Staked ETH',
    address: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
    decimals: 18,
    icon: '💎',
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    decimals: 18,
    icon: '🟡',
  },
  {
    symbol: 'FTT',
    name: 'FTX Token',
    address: '0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9',
    decimals: 18,
    icon: '⚡',
  },
  {
    symbol: 'BAL',
    name: 'Balancer',
    address: '0xba100000625a3754423978a60c9317c58a424e3D',
    decimals: 18,
    icon: '⚖️',
  },
  {
    symbol: 'ZRX',
    name: '0x Protocol',
    address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
    decimals: 18,
    icon: '0️⃣',
  },
  {
    symbol: 'BAT',
    name: 'Basic Attention Token',
    address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
    decimals: 18,
    icon: '🦇',
  },
  {
    symbol: 'ZEC',
    name: 'Zcash',
    address: '0x4EcDB6385f3Db3847F9C4A9bf3F9917bb27B5455',
    decimals: 18,
    icon: '🛡️',
  },
  {
    symbol: 'ENJ',
    name: 'Enjin Coin',
    address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c',
    decimals: 18,
    icon: '🎮',
  },
  {
    symbol: 'MANA',
    name: 'Decentraland',
    address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
    decimals: 18,
    icon: '🏝️',
  },
  {
    symbol: 'SAND',
    name: 'The Sandbox',
    address: '0x3845badAde8e6dDD04Fc68026AF8017885e639C8',
    decimals: 18,
    icon: '🏖️',
  },
  {
    symbol: 'AXS',
    name: 'Axie Infinity',
    address: '0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b',
    decimals: 18,
    icon: '🎯',
  },
  {
    symbol: 'GALA',
    name: 'Gala',
    address: '0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA',
    decimals: 8,
    icon: '🎪',
  },
  {
    symbol: 'CHZ',
    name: 'Chiliz',
    address: '0x3506424F91fD33084466F402d5D97f05F8e3b4AF',
    decimals: 18,
    icon: '⚽',
  },
]

export function getTokenAddress(symbol: string): string {
  const token = SUPPORTED_TOKENS.find((t) => t.symbol === symbol)
  return token?.address || ''
}

export function getTokenBySymbol(symbol: string): Token | undefined {
  return SUPPORTED_TOKENS.find((t) => t.symbol === symbol)
}

export function getTokenByAddress(address: string): Token | undefined {
  return SUPPORTED_TOKENS.find((t) => t.address === address)
}
