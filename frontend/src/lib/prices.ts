/**
 * Utility functions for fetching cryptocurrency prices
 */

/**
 * Fetches the current ETH price in USD from CoinGecko
 * Uses localStorage cache to avoid excessive API calls (1 minute cache)
 */
export async function getETHPriceInUSD(): Promise<number> {
  try {
    // Try to get from cache first (cache for 1 minute)
    if (typeof window !== 'undefined') {
      const cacheKey = 'sapex-eth-price-cache'
      const cacheTimeKey = 'sapex-eth-price-cache-time'
      const cachedPrice = localStorage.getItem(cacheKey)
      const cachedTime = localStorage.getItem(cacheTimeKey)
      
      if (cachedPrice && cachedTime) {
        const age = Date.now() - parseInt(cachedTime, 10)
        if (age < 60000) { // 1 minute cache
          return parseFloat(cachedPrice)
        }
      }
    }

    // Fetch from CoinGecko
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    const data = await response.json()
    
    if (data?.ethereum?.usd) {
      const price = data.ethereum.usd
      
      // Cache the price
      if (typeof window !== 'undefined') {
        localStorage.setItem('sapex-eth-price-cache', price.toString())
        localStorage.setItem('sapex-eth-price-cache-time', Date.now().toString())
      }
      
      return price
    }
    
    // Fallback to approximate if API fails
    return 3000
  } catch (error) {
    console.error('Error fetching ETH price from CoinGecko:', error)
    // Fallback to approximate if API fails
    return 3000
  }
}

