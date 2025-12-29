import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { getProvider, getContractAddress } from '@/lib/web3'
import { WEB3_BANK_ABI } from '@/lib/contracts'
import { getTokenByAddress } from '@/lib/tokens'

// Helper to check if address is valid
function isValidAddress(address: string): boolean {
  try {
    return ethers.isAddress(address) && address !== '0x' && address !== '0x...'
  } catch {
    return false
  }
}

export interface Transaction {
  user: string
  tokenIn: string
  tokenOut: string
  amountIn: string
  amountOut: string
  feeAmount: string
  timestamp: number
}

export function useTransactions(account: string | null) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [totalFeesPaid, setTotalFeesPaid] = useState(0)

  useEffect(() => {
    if (!account) {
      setTransactions([])
      setTotalFeesPaid(0)
      return
    }

    const contractAddress = getContractAddress()
    if (!contractAddress || !isValidAddress(contractAddress)) {
      // Contract not deployed yet or invalid address
      setTransactions([])
      setTotalFeesPaid(0)
      return
    }

    const fetchTransactions = async () => {
      setLoading(true)
      try {
        const provider = getProvider()
        
        // Validate contract address before creating contract instance
        if (!isValidAddress(contractAddress)) {
          console.warn('Invalid contract address:', contractAddress)
          setLoading(false)
          return
        }
        
        const contract = new ethers.Contract(contractAddress, WEB3_BANK_ABI, provider)

        const count = await contract.getUserTransactionCount(account)
        if (count > 0) {
          const txs = await contract.getUserTransactions(account, 0, Number(count))

          const formatted: Transaction[] = txs.map((tx: any) => {
            const tokenIn = getTokenByAddress(tx.tokenIn)
            const tokenOut = getTokenByAddress(tx.tokenOut)

            return {
              user: tx.user,
              tokenIn: tx.tokenIn,
              tokenOut: tx.tokenOut,
              amountIn:
                tx.tokenIn === '0x0000000000000000000000000000000000000000'
                  ? ethers.formatEther(tx.amountIn)
                  : ethers.formatUnits(tx.amountIn, tokenIn?.decimals || 18),
              amountOut:
                tx.tokenOut === '0x0000000000000000000000000000000000000000'
                  ? ethers.formatEther(tx.amountOut)
                  : ethers.formatUnits(tx.amountOut, tokenOut?.decimals || 18),
              feeAmount:
                tx.tokenIn === '0x0000000000000000000000000000000000000000'
                  ? ethers.formatEther(tx.feeAmount)
                  : ethers.formatUnits(tx.feeAmount, tokenIn?.decimals || 18),
              timestamp: Number(tx.timestamp) * 1000,
            }
          })

          setTransactions(formatted)

          const totalFees = formatted.reduce(
            (sum: number, tx: Transaction) => sum + parseFloat(tx.feeAmount),
            0
          )
          setTotalFeesPaid(totalFees)
        }
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
    const interval = setInterval(fetchTransactions, 30000)

    return () => clearInterval(interval)
  }, [account])

  return { transactions, loading, totalFeesPaid }
}

