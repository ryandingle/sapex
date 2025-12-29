import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { getProvider, isRoninNetwork } from '@/lib/web3'
import { UNISWAP_ROUTER_ABI, UNISWAP_ROUTER_ADDRESS, WETH_ADDRESS } from '@/lib/contracts'
import { getTokenAddress, SUPPORTED_TOKENS } from '@/lib/tokens'

export function usePrice(fromToken: string, toToken: string) {
  const [price, setPrice] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!fromToken || !toToken || fromToken === toToken) {
      setPrice(0)
      setLoading(false)
      return
    }

    const fetchPrice = async () => {
      try {
        const fromTokenData = SUPPORTED_TOKENS.find((t) => t.symbol === fromToken)
        const toTokenData = SUPPORTED_TOKENS.find((t) => t.symbol === toToken)

        if (!fromTokenData || !toTokenData) {
          setPrice(0)
          setLoading(false)
          return
        }

        // Skip price fetching for tokens on different chains
        // PHPC is on Ronin, so skip if we're on Ethereum or if either token is on a different chain
        const isFromTokenRonin = fromTokenData.chain === 'ronin'
        const isToTokenRonin = toTokenData.chain === 'ronin'
        const isCurrentNetworkRonin = isRoninNetwork()

        // If token is on Ronin but we're not on Ronin network, skip
        if ((isFromTokenRonin || isToTokenRonin) && !isCurrentNetworkRonin) {
          console.log(`Skipping price fetch for ${fromToken}/${toToken} - token is on different chain`)
          setPrice(0)
          setLoading(false)
          return
        }

        // If we're on Ronin but trying to use Uniswap (which is Ethereum-only), skip
        if (isCurrentNetworkRonin) {
          console.log(`Skipping price fetch - Uniswap router not available on Ronin`)
          setPrice(0)
          setLoading(false)
          return
        }

        const provider = getProvider()
        const router = new ethers.Contract(
          UNISWAP_ROUTER_ADDRESS,
          UNISWAP_ROUTER_ABI,
          provider
        )

        const fromAddress =
          fromToken === 'ETH' ? WETH_ADDRESS : fromTokenData.address
        const toAddress = toToken === 'ETH' ? WETH_ADDRESS : toTokenData.address

        const path = [fromAddress, toAddress]
        const amountIn = ethers.parseUnits('1', fromTokenData.decimals)
        
        // Check if the call would fail (e.g., no liquidity pool)
        try {
          const amounts = await router.getAmountsOut(amountIn, path)
          const amountOut = amounts[1]
          const priceValue = parseFloat(
            ethers.formatUnits(amountOut, toTokenData.decimals)
          )
          setPrice(priceValue)
        } catch (routerError: any) {
          // If router call fails (e.g., no liquidity pool), set price to 0
          console.warn(`No liquidity pool found for ${fromToken}/${toToken}:`, routerError.message)
          setPrice(0)
        }
      } catch (error) {
        console.error('Error fetching price:', error)
        setPrice(0)
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()
    const interval = setInterval(fetchPrice, 10000)

    return () => clearInterval(interval)
  }, [fromToken, toToken])

  return { price, loading }
}

