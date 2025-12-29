'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWallet } from '@/hooks/useWallet'
import { useTokenBalance } from '@/hooks/useTokenBalance'
import { usePrice } from '@/hooks/usePrice'
import { getETHPriceInUSD } from '@/lib/prices'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowDown, ChevronDown, FileText } from 'lucide-react'
import { TokenSelector } from './TokenSelector'
import { QuoteModal } from './QuoteModal'
import { NetworkSwitcher, SUPPORTED_NETWORKS, Network } from './NetworkSwitcher'
import { getContractAddress } from '@/lib/web3'
import { WEB3_BANK_ABI, ERC20_ABI } from '@/lib/contracts'
import { getTokenAddress, getTokenBySymbol, SUPPORTED_TOKENS } from '@/lib/tokens'

interface TradingInterfaceProps {
  initialToken?: string | null
}

export function TradingInterface({ initialToken }: TradingInterfaceProps = {}) {
  const { account, provider, connect, isConnecting } = useWallet()
  const [fromToken, setFromToken] = useState(initialToken || 'USDC')
  const [toToken, setToToken] = useState('ETH')

  // Update fromToken when initialToken changes
  useEffect(() => {
    if (initialToken) {
      setFromToken(initialToken)
    }
  }, [initialToken])
  const [amount, setAmount] = useState('')
  const [outputAmount, setOutputAmount] = useState('')
  const [inputMode, setInputMode] = useState<'sell' | 'buy'>('sell') // 'sell' means input is sell amount, 'buy' means input is buy amount
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slippage, setSlippage] = useState(0.5)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isNetworkSwitcherOpen, setIsNetworkSwitcherOpen] = useState(false)
  const [fromNetwork, setFromNetwork] = useState<Network>(SUPPORTED_NETWORKS[0]) // Ethereum
  const [toNetwork, setToNetwork] = useState<Network>(SUPPORTED_NETWORKS[1]) // Arbitrum

  // Load slippage from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('swapit-settings')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed.slippage) {
            setSlippage(parsed.slippage)
          }
        } catch (error) {
          console.error('Error loading settings:', error)
        }
      }
    }

    // Listen for slippage changes from settings modal
    const handleSlippageChange = (event: CustomEvent) => {
      setSlippage(event.detail)
    }

    window.addEventListener('slippageChanged', handleSlippageChange as EventListener)
    return () => {
      window.removeEventListener('slippageChanged', handleSlippageChange as EventListener)
    }
  }, [])

  const fromTokenData = getTokenBySymbol(fromToken)
  const toTokenData = getTokenBySymbol(toToken)
  const fromAddress = fromToken === 'ETH' ? 'native' : getTokenAddress(fromToken)

  const { balance: fromBalance } = useTokenBalance(fromAddress, account)
  const { price: exchangeRate, loading: priceLoading } = usePrice(
    fromToken,
    toToken
  )
  const [estimatedOutput, setEstimatedOutput] = useState('0')
  const [feeAmount, setFeeAmount] = useState('0')
  const [usdValue, setUsdValue] = useState('0')
  const [ethPrice, setEthPrice] = useState<number>(3000) // Default fallback

  // Fetch ETH price on mount and periodically
  useEffect(() => {
    const updateEthPrice = async () => {
      const price = await getETHPriceInUSD()
      setEthPrice(price)
    }
    
    updateEthPrice()
    const interval = setInterval(updateEthPrice, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (exchangeRate && !priceLoading && fromTokenData && toTokenData) {
      if (inputMode === 'sell' && amount) {
        // Calculate output from input (sell amount)
        const inputAmount = parseFloat(amount) || 0
        const fee = inputAmount * 0.0008 // 0.08% fee
        const output = (inputAmount - fee) * exchangeRate
        setEstimatedOutput(output.toFixed(6))
        setOutputAmount(output.toFixed(6))
        setFeeAmount(fee.toFixed(6))
        
        // Calculate USD value using real-time prices
        if (fromToken === 'USDC' || fromToken === 'USDT' || fromToken === 'DAI') {
          setUsdValue(inputAmount.toFixed(2))
        } else if (fromToken === 'ETH') {
          setUsdValue((inputAmount * ethPrice).toFixed(2))
        } else {
          // For other tokens, exchangeRate is in ETH terms, so multiply by ETH price
          setUsdValue((inputAmount * exchangeRate * ethPrice).toFixed(2))
        }
      } else if (inputMode === 'buy' && outputAmount) {
        // Calculate input from output (buy amount)
        const output = parseFloat(outputAmount) || 0
        // Reverse calculation: output = (input - fee) * exchangeRate
        // So: input = (output / exchangeRate) + fee
        // And: fee = input * 0.0008
        // So: input = output / exchangeRate / (1 - 0.0008)
        const inputAmount = output / exchangeRate / (1 - 0.0008)
        const fee = inputAmount * 0.0008
        setAmount(inputAmount.toFixed(6))
        setEstimatedOutput(output.toFixed(6))
        setFeeAmount(fee.toFixed(6))
        
        // Calculate USD value using real-time prices
        if (fromToken === 'USDC' || fromToken === 'USDT' || fromToken === 'DAI') {
          setUsdValue(inputAmount.toFixed(2))
        } else if (fromToken === 'ETH') {
          setUsdValue((inputAmount * ethPrice).toFixed(2))
        } else {
          // For other tokens, exchangeRate is in ETH terms, so multiply by ETH price
          setUsdValue((inputAmount * exchangeRate * ethPrice).toFixed(2))
        }
      } else {
        setEstimatedOutput('0')
        setFeeAmount('0')
        setUsdValue('0')
      }
    } else {
      setEstimatedOutput('0')
      setFeeAmount('0')
      setUsdValue('0')
    }
  }, [amount, outputAmount, inputMode, exchangeRate, priceLoading, fromTokenData, toTokenData, fromToken, ethPrice])

  const handleSwap = async () => {
    if (!account || !provider || !amount) {
      setError('Please connect wallet and enter amount')
      return
    }

    if (!fromTokenData || !toTokenData) {
      setError('Invalid token selection')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const contractAddress = getContractAddress()
      if (!contractAddress || !ethers.isAddress(contractAddress)) {
        throw new Error('Contract address not configured. Please deploy the contract and update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local')
      }

      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, WEB3_BANK_ABI, signer)

      const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes

      let tx

      if (fromToken === 'ETH') {
        // Buy tokens with ETH
        const amountIn = ethers.parseEther(amount)
        const minAmountOut = ethers.parseUnits(
          (parseFloat(estimatedOutput) * (1 - slippage / 100)).toFixed(
            toTokenData.decimals
          ),
          toTokenData.decimals
        )

        tx = await contract.swapETHForTokens(
          getTokenAddress(toToken),
          minAmountOut,
          deadline,
          { value: amountIn }
        )
      } else if (toToken === 'ETH') {
        // Sell tokens for ETH
        const amountIn = ethers.parseUnits(amount, fromTokenData.decimals)
        const minAmountOut = ethers.parseEther(
          (parseFloat(estimatedOutput) * (1 - slippage / 100)).toFixed(18)
        )

        const tokenContract = new ethers.Contract(
          getTokenAddress(fromToken),
          ERC20_ABI,
          signer
        )

        // Check and approve if needed
        const allowance = await tokenContract.allowance(
          account,
          contractAddress
        )
        if (allowance < amountIn) {
          const approveTx = await tokenContract.approve(contractAddress, amountIn)
          await approveTx.wait()
        }

        tx = await contract.swapTokensForETH(
          getTokenAddress(fromToken),
          amountIn,
          minAmountOut,
          deadline
        )
      } else {
        // Token to token swap
        const amountIn = ethers.parseUnits(amount, fromTokenData.decimals)
        const minAmountOut = ethers.parseUnits(
          (parseFloat(estimatedOutput) * (1 - slippage / 100)).toFixed(
            toTokenData.decimals
          ),
          toTokenData.decimals
        )

        const tokenContract = new ethers.Contract(
          getTokenAddress(fromToken),
          ERC20_ABI,
          signer
        )

        // Check and approve if needed
        const allowance = await tokenContract.allowance(
          account,
          contractAddress
        )
        if (allowance < amountIn) {
          const approveTx = await tokenContract.approve(contractAddress, amountIn)
          await approveTx.wait()
        }

        tx = await contract.swapTokensForTokens(
          getTokenAddress(fromToken),
          getTokenAddress(toToken),
          amountIn,
          minAmountOut,
          deadline
        )
      }

      await tx.wait()

      // Refresh balances
      setAmount('')
      alert('Swap successful!')
    } catch (err: any) {
      console.error('Swap error:', err)
      setError(
        err.reason || err.message || 'Swap failed. Please try again.'
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const setMaxAmount = () => {
    setAmount(parseFloat(fromBalance).toFixed(6))
  }

  const swapTokens = () => {
    // Swap both tokens and networks
    const tempToken = fromToken
    setFromToken(toToken)
    setToToken(tempToken)
    
    const tempNetwork = fromNetwork
    setFromNetwork(toNetwork)
    setToNetwork(tempNetwork)
  }

  const handleNetworkChange = (newFromNetwork: Network, newToNetwork: Network) => {
    setFromNetwork(newFromNetwork)
    setToNetwork(newToNetwork)
    // Optionally swap tokens when networks change
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
  }

  if (!account) {
    return (
      <div className="bg-[#1e1f24] rounded-3xl border border-gray-800/50 p-8 shadow-2xl">
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold text-white mb-4">Connect Your Wallet</h3>
          <p className="text-gray-400 mb-6">
            Connect your wallet to start trading cryptocurrencies
          </p>
          <Button 
            onClick={connect} 
            disabled={isConnecting}
            size="lg" 
            className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-90"
          >
            {isConnecting ? (
              <span className="flex items-center gap-2">
                <span className="animate-pulse-slow">●</span>
                Connecting...
              </span>
            ) : (
              'Get Started'
            )}
          </Button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">
          Buy and sell crypto on multiple networks including Ethereum, Ronin, and more.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#1e1f24] rounded-2xl sm:rounded-3xl border border-gray-800/50 p-4 sm:p-6 shadow-2xl max-w-2xl mx-auto">
      {/* Network Indicator */}
      <div className="mb-4 flex items-center justify-center" data-tutorial="network-indicator">
        <button
          onClick={() => setIsNetworkSwitcherOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d0e10] border border-gray-800 hover:border-gray-700 transition-colors group"
        >
          <div className="w-4 h-4 flex items-center justify-center">
            {typeof fromNetwork.icon === 'string' ? (
              <span className="text-sm">{fromNetwork.icon}</span>
            ) : (
              <div className="w-4 h-4">{fromNetwork.icon}</div>
            )}
          </div>
          <span className="text-xs font-medium text-gray-300 group-hover:text-white">{fromNetwork.name}</span>
          <ArrowDown className="w-3 h-3 text-gray-400 rotate-90" />
          <div className="w-4 h-4 flex items-center justify-center">
            {typeof toNetwork.icon === 'string' ? (
              <span className="text-sm">{toNetwork.icon}</span>
            ) : (
              <div className="w-4 h-4">{toNetwork.icon}</div>
            )}
          </div>
          <span className="text-xs font-medium text-gray-300 group-hover:text-white">{toNetwork.name}</span>
        </button>
      </div>

      {/* Sell Section */}
      <div className="mb-4 sm:mb-6" data-tutorial="sell-section">
        <label className="text-xs sm:text-sm font-medium text-gray-400 mb-2 block">You sell</label>
        <div className="bg-[#0d0e10] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-gray-800/50 hover:border-gray-700/50 transition-colors">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
            <Input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-transparent border-0 text-2xl sm:text-3xl md:text-4xl font-semibold text-white p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-600"
            />
            <TokenSelector
              value={fromToken}
              onChange={setFromToken}
              exclude={toToken}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
            <span className="text-gray-500 text-xs sm:text-sm font-medium">${usdValue}</span>
            <button
              onClick={() => setAmount(parseFloat(fromBalance).toFixed(6))}
              className="text-gray-400 hover:text-white text-xs sm:text-sm font-medium transition-colors"
            >
              Balance: {parseFloat(fromBalance).toFixed(4)} {fromToken}
            </button>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={swapTokens}
          className="rounded-full bg-[#0d0e10] border-2 border-gray-800 hover:bg-[#1e1f24] hover:border-gray-700 w-10 h-10 transition-all duration-300 hover:rotate-180"
          title="Swap tokens and networks"
          data-tutorial="swap-button"
        >
          <ArrowDown className="w-5 h-5 text-white" />
        </Button>
      </div>

      {/* Network Switcher Popover */}
      <NetworkSwitcher
        open={isNetworkSwitcherOpen}
        onOpenChange={setIsNetworkSwitcherOpen}
        fromNetwork={fromNetwork}
        toNetwork={toNetwork}
        onNetworkChange={handleNetworkChange}
      />

      {/* Buy Section */}
      <div className="mt-4 sm:mt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs sm:text-sm font-medium text-gray-400">You buy</label>
          <button
            onClick={() => {
              setInputMode(inputMode === 'sell' ? 'buy' : 'sell')
              // Clear amounts when switching modes
              setAmount('')
              setOutputAmount('')
            }}
            className="text-xs text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
          >
            {inputMode === 'sell' ? 'Enter buy amount' : 'Enter sell amount'}
          </button>
        </div>
        <div className="bg-[#0d0e10] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-gray-800/50 hover:border-gray-700/50 transition-colors" data-tutorial="buy-section">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
            <Input
              type="number"
              placeholder="0"
              value={inputMode === 'buy' ? outputAmount : estimatedOutput}
              onChange={(e) => {
                if (inputMode === 'buy') {
                  setOutputAmount(e.target.value)
                }
              }}
              disabled={inputMode === 'sell'}
              className="flex-1 bg-transparent border-0 text-2xl sm:text-3xl md:text-4xl font-semibold text-white p-0 h-auto focus-visible:ring-0 disabled:opacity-100 disabled:cursor-not-allowed placeholder:text-gray-600"
            />
            <TokenSelector
              value={toToken}
              onChange={setToToken}
              exclude={fromToken}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
            <span className="text-gray-500 text-xs sm:text-sm font-medium">
              {priceLoading ? 'Loading...' : `1 ${fromToken} = ${exchangeRate?.toFixed(6) || '0'} ${toToken}`}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm font-medium">
              Platform fee: 0.08%
            </span>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4 bg-red-500/10 border-red-500/50">
          <AlertDescription className="text-red-400">{error}</AlertDescription>
        </Alert>
      )}

      {/* Get Quote Button */}
      {account && amount && parseFloat(amount) > 0 && parseFloat(amount) <= parseFloat(fromBalance) && (
        <Button
          onClick={() => setIsQuoteModalOpen(true)}
          variant="outline"
          className="w-full mt-4 sm:mt-5 border-gray-700 text-gray-300 hover:bg-[#1e1f24] hover:text-white h-10 sm:h-12 text-sm sm:text-base font-medium rounded-xl transition-all duration-200"
          data-tutorial="quote-button"
        >
          <FileText className="w-4 h-4 mr-2" />
          Get Quote
        </Button>
      )}

      <Button
        onClick={handleSwap}
        disabled={
          !amount ||
          isProcessing ||
          parseFloat(amount) > parseFloat(fromBalance) ||
          parseFloat(amount) <= 0 ||
          !account ||
          !estimatedOutput ||
          parseFloat(estimatedOutput) <= 0
        }
        className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-90 text-white h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
        data-tutorial="swap-action"
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <span className="animate-pulse-slow">●</span>
            Processing...
          </span>
        ) : account ? (
          `Swap ${fromToken} for ${toToken}`
        ) : (
          'Get Started'
        )}
      </Button>

      {/* Quote Modal */}
      <QuoteModal
        open={isQuoteModalOpen}
        onOpenChange={setIsQuoteModalOpen}
        fromToken={fromToken}
        toToken={toToken}
        amountIn={amount}
        amountOut={estimatedOutput}
        feeAmount={feeAmount}
        exchangeRate={exchangeRate || 0}
        slippage={slippage}
        onConfirm={() => {
          setIsQuoteModalOpen(false)
          handleSwap()
        }}
        isProcessing={isProcessing}
      />
    </div>
  )
}
