'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, TrendingUp, TrendingDown, Zap, DollarSign, Percent } from 'lucide-react'
import { getTokenBySymbol } from '@/lib/tokens'

interface QuoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fromToken: string
  toToken: string
  amountIn: string
  amountOut: string
  feeAmount: string
  exchangeRate: number
  slippage: number
  onConfirm: () => void
  isProcessing?: boolean
}

export function QuoteModal({
  open,
  onOpenChange,
  fromToken,
  toToken,
  amountIn,
  amountOut,
  feeAmount,
  exchangeRate,
  slippage,
  onConfirm,
  isProcessing = false,
}: QuoteModalProps) {
  const fromTokenData = getTokenBySymbol(fromToken)
  const toTokenData = getTokenBySymbol(toToken)

  // Calculate price impact (simplified - in production, use real liquidity data)
  const priceImpact = parseFloat(amountIn) > 0 
    ? Math.min((parseFloat(amountIn) / 1000000) * 100, 5) // Mock calculation
    : 0

  // Estimate gas (simplified)
  const estimatedGas = fromToken === 'ETH' || toToken === 'ETH' ? '~0.002 ETH' : '~0.003 ETH'

  // Calculate minimum received (with slippage)
  const minAmountOut = parseFloat(amountOut) * (1 - slippage / 100)

  const isHighPriceImpact = priceImpact > 3
  const isVeryHighPriceImpact = priceImpact > 5

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Swap Quote</DialogTitle>
          <DialogDescription>
            Review the details of your swap before confirming
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Swap Summary */}
          <div className="p-4 rounded-lg bg-[#0d0e10] border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#1e1f24] flex items-center justify-center border border-gray-800">
                  <span className="text-sm font-semibold text-white">{fromToken}</span>
                </div>
                <span className="text-2xl font-bold text-white">{amountIn || '0'}</span>
                <span className="text-gray-400">{fromToken}</span>
              </div>
              <div className="text-gray-400">→</div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#1e1f24] flex items-center justify-center border border-gray-800">
                  <span className="text-sm font-semibold text-white">{toToken}</span>
                </div>
                <span className="text-2xl font-bold text-white">{amountOut || '0'}</span>
                <span className="text-gray-400">{toToken}</span>
              </div>
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="p-4 rounded-lg bg-[#0d0e10] border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Exchange Rate</span>
              </div>
              <span className="text-white font-medium">
                1 {fromToken} = {exchangeRate.toFixed(6)} {toToken}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0e10] border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400">
                <Percent className="w-4 h-4" />
                <span className="text-sm">Platform Fee</span>
              </div>
              <span className="text-white font-medium">
                {feeAmount} {fromToken} (0.08%)
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0e10] border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Estimated Gas</span>
              </div>
              <span className="text-white font-medium">{estimatedGas}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0e10] border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400">
                <Info className="w-4 h-4" />
                <span className="text-sm">Slippage Tolerance</span>
              </div>
              <span className="text-white font-medium">{slippage}%</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0e10] border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400">
                {priceImpact >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm">Price Impact</span>
              </div>
              <span className={`font-medium ${
                isVeryHighPriceImpact ? 'text-red-500' :
                isHighPriceImpact ? 'text-yellow-500' :
                'text-green-500'
              }`}>
                {priceImpact.toFixed(2)}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0e10] border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400">
                <Info className="w-4 h-4" />
                <span className="text-sm">Minimum Received</span>
              </div>
              <span className="text-white font-medium">
                {minAmountOut.toFixed(6)} {toToken}
              </span>
            </div>
          </div>

          {/* Warnings */}
          {isHighPriceImpact && (
            <Alert className={`${
              isVeryHighPriceImpact 
                ? 'bg-red-500/10 border-red-500/50' 
                : 'bg-yellow-500/10 border-yellow-500/50'
            }`}>
              <AlertDescription className={`text-sm ${
                isVeryHighPriceImpact ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {isVeryHighPriceImpact 
                  ? '⚠️ Very high price impact! This swap may result in significant loss. Consider splitting into smaller trades.'
                  : '⚠️ High price impact detected. Consider using a smaller amount or waiting for better liquidity.'
                }
              </AlertDescription>
            </Alert>
          )}

          {parseFloat(amountIn) > 0 && parseFloat(amountOut) === 0 && (
            <Alert className="bg-yellow-500/10 border-yellow-500/50">
              <AlertDescription className="text-yellow-400 text-sm">
                Unable to calculate quote. Please check your input amount and try again.
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-700 text-gray-300 hover:bg-[#1e1f24]"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={!amountIn || parseFloat(amountIn) <= 0 || parseFloat(amountOut) === 0 || isProcessing}
              className="flex-1 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-90"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse-slow">●</span>
                  Processing...
                </span>
              ) : (
                'Confirm Swap'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

