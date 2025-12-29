import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWallet } from './useWallet'
import { ERC20_ABI } from '@/lib/contracts'
import { getTokenByAddress, SUPPORTED_TOKENS } from '@/lib/tokens'

export function useTokenBalance(
  tokenAddress: string | 'native',
  account: string | null
) {
  const { provider } = useWallet()
  const [balance, setBalance] = useState<string>('0')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!provider || !account) {
      setBalance('0')
      return
    }

    const fetchBalance = async () => {
      setLoading(true)
      try {
        if (tokenAddress === 'native') {
          const balance = await provider.getBalance(account)
          setBalance(ethers.formatEther(balance))
        } else {
          const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
          const balance = await contract.balanceOf(account)
          const token = getTokenByAddress(tokenAddress)
          const decimals = token?.decimals || 18
          setBalance(ethers.formatUnits(balance, decimals))
        }
      } catch (error) {
        console.error('Error fetching balance:', error)
        setBalance('0')
      } finally {
        setLoading(false)
      }
    }

    fetchBalance()
    const interval = setInterval(fetchBalance, 10000)

    return () => clearInterval(interval)
  }, [provider, account, tokenAddress])

  return { balance, loading }
}

