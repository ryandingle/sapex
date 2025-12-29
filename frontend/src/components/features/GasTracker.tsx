'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Gauge, TrendingUp, TrendingDown, Clock } from 'lucide-react'

interface GasData {
  slow: number
  standard: number
  fast: number
  timestamp: number
}

export function GasTracker() {
  const [gasData, setGasData] = useState<GasData | null>(null)
  const [loading, setLoading] = useState(true)
  const [recommendation, setRecommendation] = useState<'slow' | 'standard' | 'fast'>('standard')

  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        // Using EthGasStation API (free tier)
        const response = await fetch('https://ethgasstation.info/api/ethgasAPI.json')
        const data = await response.json()
        
        // Convert from gwei to wei (EthGasStation returns in 10x gwei)
        const slow = data.safeLow / 10
        const standard = data.average / 10
        const fast = data.fast / 10

        setGasData({
          slow,
          standard,
          fast,
          timestamp: Date.now(),
        })

        // Determine recommendation
        if (standard < 30) {
          setRecommendation('standard')
        } else if (standard < 50) {
          setRecommendation('fast')
        } else {
          setRecommendation('slow')
        }
      } catch (error) {
        console.error('Error fetching gas price:', error)
        // Fallback mock data
        setGasData({
          slow: 20,
          standard: 30,
          fast: 40,
          timestamp: Date.now(),
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGasPrice()
    const interval = setInterval(fetchGasPrice, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getGasColor = (type: 'slow' | 'standard' | 'fast') => {
    if (!gasData) return 'text-gray-400'
    const value = gasData[type]
    if (value < 30) return 'text-green-500'
    if (value < 50) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getRecommendationText = () => {
    if (!gasData) return 'Loading...'
    if (recommendation === 'slow') {
      return 'Gas prices are high. Consider waiting or using slow speed.'
    }
    if (recommendation === 'standard') {
      return 'Gas prices are moderate. Standard speed recommended.'
    }
    return 'Gas prices are low. Fast speed recommended for quick confirmation.'
  }

  return (
    <Card className="bg-[#1e1f24] border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Gauge className="w-5 h-5" />
          Gas Price Tracker
        </CardTitle>
        <CardDescription>
          Monitor Ethereum gas prices for optimal trading times
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading gas prices...</div>
        ) : gasData ? (
          <>
            <div className="grid grid-cols-3 gap-3">
              <div className={`p-4 rounded-lg bg-[#0d0e10] border border-gray-800 ${recommendation === 'slow' ? 'ring-2 ring-[#3B82F6]' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400">Slow</span>
                </div>
                <div className={`text-2xl font-bold ${getGasColor('slow')}`}>
                  {gasData.slow.toFixed(0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Gwei</div>
              </div>
              <div className={`p-4 rounded-lg bg-[#0d0e10] border border-gray-800 ${recommendation === 'standard' ? 'ring-2 ring-[#3B82F6]' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400">Standard</span>
                </div>
                <div className={`text-2xl font-bold ${getGasColor('standard')}`}>
                  {gasData.standard.toFixed(0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Gwei</div>
              </div>
              <div className={`p-4 rounded-lg bg-[#0d0e10] border border-gray-800 ${recommendation === 'fast' ? 'ring-2 ring-[#3B82F6]' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400">Fast</span>
                </div>
                <div className={`text-2xl font-bold ${getGasColor('fast')}`}>
                  {gasData.fast.toFixed(0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Gwei</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0d0e10] border border-gray-800">
              <p className="text-sm text-gray-300">{getRecommendationText()}</p>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Last updated: {new Date(gasData.timestamp).toLocaleTimeString()}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-400">Unable to load gas prices</div>
        )}
      </CardContent>
    </Card>
  )
}

