'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePrice } from '@/hooks/usePrice'

interface PriceChartProps {
  fromToken: string
  toToken: string
}

export function PriceChart({ fromToken, toToken }: PriceChartProps) {
  const { price, loading } = usePrice(fromToken, toToken)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white">Price Chart</CardTitle>
        <CardDescription className="text-gray-400">
          {fromToken} / {toToken} Exchange Rate
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-32 flex items-center justify-center">
            <p className="text-gray-400">Loading price...</p>
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">
                1 {fromToken} = {price.toFixed(6)} {toToken}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Real-time price data
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

