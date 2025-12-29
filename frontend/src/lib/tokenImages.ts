/**
 * Utility functions to get token image URLs
 * Uses multiple sources for reliability
 */

/**
 * Get token image URL from various sources
 * @param address - Token contract address (or 'native' for ETH)
 * @param symbol - Token symbol as fallback
 * @returns URL to token image
 */
export function getTokenImageUrl(address: string, symbol: string): string {
  // Handle native ETH
  if (address === 'native' || symbol === 'ETH') {
    return 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png'
  }

  // Convert address to lowercase for URL
  const lowerAddress = address.toLowerCase()

  // Primary: Trust Wallet assets (most reliable)
  // Format: https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/{address}/logo.png
  const trustWalletUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${lowerAddress}/logo.png`

  // Fallback: Token Icons API
  // Format: https://token-icons.s3.amazonaws.com/{address}.png
  const tokenIconsUrl = `https://token-icons.s3.amazonaws.com/${lowerAddress}.png`

  // For now, return Trust Wallet URL (components can handle fallback)
  return trustWalletUrl
}

/**
 * Get token image URL with fallback support
 * Returns an array of URLs to try in order
 */
export function getTokenImageUrls(address: string, symbol: string): string[] {
  if (address === 'native' || symbol === 'ETH') {
    return [
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
      'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    ]
  }

  const lowerAddress = address.toLowerCase()
  return [
    `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${lowerAddress}/logo.png`,
    `https://token-icons.s3.amazonaws.com/${lowerAddress}.png`,
    `https://assets.coingecko.com/coins/images/${getCoinGeckoId(symbol)}/small/${symbol.toLowerCase()}.png`,
  ]
}

/**
 * Get CoinGecko coin ID for known tokens
 */
function getCoinGeckoId(symbol: string): number {
  const coinGeckoIds: Record<string, number> = {
    USDC: 3408,
    USDT: 825,
    WBTC: 3717,
    DAI: 4943,
    UNI: 12504,
    LINK: 1975,
    AAVE: 7278,
    CRV: 6538,
    MKR: 1518,
    SNX: 2586,
    COMP: 5692,
    SUSHI: 11976,
    '1INCH': 8104,
    MATIC: 4713,
    SHIB: 11939,
    PEPE: 25028,
    WETH: 2396,
    stETH: 15060,
    FRAX: 6952,
    TUSD: 2563,
    BUSD: 4687,
    APE: 18876,
    GRT: 6719,
    ENS: 13855,
    LDO: 13573,
    ARB: 11841,
    OP: 11840,
    rETH: 15060,
    YFI: 5864,
    RPL: 2943,
    LRC: 1934,
    cbETH: 21535,
    BNB: 1839,
    FTT: 4195,
    BAL: 5728,
    ZRX: 1896,
    BAT: 1697,
    ZEC: 1437,
    ENJ: 2130,
    MANA: 1966,
    SAND: 12129,
    AXS: 6783,
    GALA: 12493,
    CHZ: 4066,
  }
  return coinGeckoIds[symbol] || 1
}

