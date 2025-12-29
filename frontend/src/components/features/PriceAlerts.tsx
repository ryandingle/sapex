'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Bell, BellOff, Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { SUPPORTED_TOKENS, Token } from '@/lib/tokens'
import { ethers } from 'ethers'
import { getProvider, isRoninNetwork } from '@/lib/web3'
import { UNISWAP_ROUTER_ABI, UNISWAP_ROUTER_ADDRESS, WETH_ADDRESS } from '@/lib/contracts'
import { getETHPriceInUSD } from '@/lib/prices'

interface PriceAlert {
  id: string
  tokenSymbol: string
  targetPrice: number
  direction: 'above' | 'below'
  isActive: boolean
  createdAt: number
}

export function PriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [selectedToken, setSelectedToken] = useState('ETH')
  const [targetPrice, setTargetPrice] = useState('')
  const [direction, setDirection] = useState<'above' | 'below'>('above')
  const [error, setError] = useState<string | null>(null)
  const [currentPrices, setCurrentPrices] = useState<Record<string, number>>({})
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')

  // Load alerts from localStorage and check notification permission
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sapex-price-alerts')
      if (saved) {
        try {
          setAlerts(JSON.parse(saved))
        } catch (error) {
          console.error('Error loading alerts:', error)
        }
      }
      
      // Check notification permission
      if ('Notification' in window) {
        setNotificationPermission(Notification.permission)
      }
    }
  }, [])

  const saveAlerts = useCallback((newAlerts: PriceAlert[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sapex-price-alerts', JSON.stringify(newAlerts))
    }
  }, [])

  // Helper function to get token price in USD
  const getTokenPriceInUSD = useCallback(async (tokenSymbol: string): Promise<number> => {
    try {
      const tokenData = SUPPORTED_TOKENS.find(t => t.symbol === tokenSymbol)
      if (!tokenData) return 0

      // Skip price fetching for tokens on different chains
      // PHPC is on Ronin, so skip if we're on Ethereum
      const isTokenRonin = tokenData.chain === 'ronin'
      const isCurrentNetworkRonin = isRoninNetwork()

      if (isTokenRonin && !isCurrentNetworkRonin) {
        console.log(`Skipping price fetch for ${tokenSymbol} - token is on Ronin network`)
        return 0
      }

      // If we're on Ronin but trying to use Uniswap (which is Ethereum-only), skip
      if (isCurrentNetworkRonin) {
        console.log(`Skipping price fetch - Uniswap router not available on Ronin`)
        return 0
      }

      // Get real-time ETH price from CoinGecko
      const ETH_PRICE_USD = await getETHPriceInUSD()
      
      if (tokenSymbol === 'ETH') {
        return ETH_PRICE_USD
      }

      // Get price relative to ETH
      const provider = getProvider()
      const router = new ethers.Contract(
        UNISWAP_ROUTER_ADDRESS,
        UNISWAP_ROUTER_ABI,
        provider
      )

      const tokenAddress = tokenSymbol === 'ETH' ? WETH_ADDRESS : tokenData.address
      const path = [tokenAddress, WETH_ADDRESS]
      const amountIn = ethers.parseUnits('1', tokenData.decimals)
      
      try {
        const amounts = await router.getAmountsOut(amountIn, path)
        const amountOut = amounts[1]
        const priceInETH = parseFloat(ethers.formatEther(amountOut))
        
        // Convert to USD
        return priceInETH * ETH_PRICE_USD
      } catch (routerError: any) {
        // If router call fails (e.g., no liquidity pool), return 0
        console.warn(`No liquidity pool found for ${tokenSymbol}:`, routerError.message)
        return 0
      }
    } catch (error) {
      console.error(`Error fetching price for ${tokenSymbol}:`, error)
      return 0
    }
  }, [])

  // Update current prices for display
  useEffect(() => {
    if (alerts.length === 0) return

    const updatePrices = async () => {
      const uniqueTokens = [...new Set(alerts.map(a => a.tokenSymbol))]
      const prices: Record<string, number> = {}
      
      for (const tokenSymbol of uniqueTokens) {
        try {
          const price = await getTokenPriceInUSD(tokenSymbol)
          if (price > 0) {
            prices[tokenSymbol] = price
          }
        } catch (error) {
          console.error(`Error fetching price for ${tokenSymbol}:`, error)
        }
      }
      
      setCurrentPrices(prices)
    }

    updatePrices()
    const interval = setInterval(updatePrices, 10000) // Update every 10 seconds
    return () => clearInterval(interval)
  }, [alerts, getTokenPriceInUSD])

  // Check alerts against current prices
  useEffect(() => {
    if (alerts.length === 0) return

    const checkAlerts = async () => {
      const activeAlerts = alerts.filter(a => a.isActive)
      if (activeAlerts.length === 0) return

      for (const alert of activeAlerts) {
        try {
          // Get current price in USD
          const currentPrice = await getTokenPriceInUSD(alert.tokenSymbol)
          const target = alert.targetPrice

          console.log(`Checking alert for ${alert.tokenSymbol}: Current: $${currentPrice}, Target: $${target}, Direction: ${alert.direction}`)

          if (currentPrice > 0) {
            let shouldTrigger = false
            
            if (alert.direction === 'above' && currentPrice >= target) {
              shouldTrigger = true
            } else if (alert.direction === 'below' && currentPrice <= target) {
              shouldTrigger = true
            }

            if (shouldTrigger) {
              console.log(`Alert triggered for ${alert.tokenSymbol}!`)
              
              // Show browser notification
              if ('Notification' in window && Notification.permission === 'granted') {
                try {
                  new Notification(`Price Alert: ${alert.tokenSymbol}`, {
                    body: `${alert.tokenSymbol} is now ${alert.direction === 'above' ? 'above' : 'below'} $${alert.targetPrice.toFixed(2)} (Current: $${currentPrice.toFixed(2)})`,
                    icon: '/favicon.ico',
                    tag: `alert-${alert.id}`,
                  })
                } catch (notifError) {
                  console.error('Error showing notification:', notifError)
                }
              } else {
                // Fallback: Show alert if notifications not available
                alert(`${alert.tokenSymbol} is now ${alert.direction === 'above' ? 'above' : 'below'} $${alert.targetPrice.toFixed(2)} (Current: $${currentPrice.toFixed(2)})`)
              }

              // Deactivate alert
              setAlerts(prev => {
                const updated = prev.map(a =>
                  a.id === alert.id ? { ...a, isActive: false } : a
                )
                saveAlerts(updated)
                return updated
              })
            }
          }
        } catch (error) {
          console.error('Error checking alert:', error)
        }
      }
    }

    const interval = setInterval(checkAlerts, 30000) // Check every 30 seconds
    checkAlerts() // Check immediately
    return () => clearInterval(interval)
  }, [alerts, getTokenPriceInUSD, saveAlerts])


  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
      if (permission === 'granted') {
        console.log('Notification permission granted')
      } else {
        console.log('Notification permission denied')
      }
    }
  }

  const handleCreateAlert = () => {
    setError(null)

    if (!targetPrice || parseFloat(targetPrice) <= 0) {
      setError('Please enter a valid target price')
      return
    }

    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      tokenSymbol: selectedToken,
      targetPrice: parseFloat(targetPrice),
      direction,
      isActive: true,
      createdAt: Date.now(),
    }

    const updated = [...alerts, newAlert]
    setAlerts(updated)
    saveAlerts(updated)
    setTargetPrice('')
    requestNotificationPermission()
  }

  const handleDeleteAlert = (id: string) => {
    const updated = alerts.filter(a => a.id !== id)
    setAlerts(updated)
    saveAlerts(updated)
  }

  const handleToggleAlert = (id: string) => {
    const updated = alerts.map(a =>
      a.id === id ? { ...a, isActive: !a.isActive } : a
    )
    setAlerts(updated)
    saveAlerts(updated)
  }

  return (
    <Card className="bg-[#1e1f24] border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Bell className="w-5 h-5" />
          Price Alerts
        </CardTitle>
        <CardDescription>
          Get notified when token prices reach your target
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Create Alert Form */}
        <div className="space-y-3 p-4 rounded-lg bg-[#0d0e10] border border-gray-800">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Token</Label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger className="bg-[#1e1f24] border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_TOKENS.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Direction</Label>
              <Select value={direction} onValueChange={(v) => setDirection(v as 'above' | 'below')}>
                <SelectTrigger className="bg-[#1e1f24] border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Above</SelectItem>
                  <SelectItem value="below">Below</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Target Price (USD)</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="h-12 bg-[#1e1f24] border-gray-700 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] text-base"
            />
          </div>
          {error && (
            <Alert className="bg-red-500/10 border-red-500/50">
              <AlertDescription className="text-red-500 text-sm">{error}</AlertDescription>
            </Alert>
          )}
          <Button onClick={handleCreateAlert} className="w-full">
            Create Alert
          </Button>
          
          {/* Notification Permission Status */}
          {notificationPermission !== 'granted' && (
            <div className="mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
              <p className="text-xs text-yellow-400 mb-2">
                {notificationPermission === 'denied' 
                  ? 'Notifications are blocked. Please enable them in your browser settings to receive price alerts.'
                  : 'Enable browser notifications to receive price alerts.'}
              </p>
              {notificationPermission === 'default' && (
                <Button
                  onClick={requestNotificationPermission}
                  variant="outline"
                  size="sm"
                  className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20 text-xs"
                >
                  Enable Notifications
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Alerts List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {alerts.length === 0 ? (
            <p className="text-center text-gray-400 py-4">No alerts created yet</p>
          ) : (
            alerts.map((alert) => {
              const token = SUPPORTED_TOKENS.find(t => t.symbol === alert.tokenSymbol)
              return (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#0d0e10] border border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    {alert.direction === 'above' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{alert.tokenSymbol}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          alert.isActive ? 'bg-green-500/20 text-green-500' : 'bg-gray-700 text-gray-400'
                        }`}>
                          {alert.isActive ? 'Active' : 'Triggered'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {alert.direction === 'above' ? 'Above' : 'Below'} ${alert.targetPrice.toFixed(2)}
                      </p>
                      {currentPrices[alert.tokenSymbol] !== undefined && (
                        <p className="text-xs text-[#3B82F6] mt-0.5">
                          Current: ${currentPrices[alert.tokenSymbol].toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleAlert(alert.id)}
                      className="h-8 w-8"
                    >
                      {alert.isActive ? (
                        <Bell className="w-4 h-4 text-green-500" />
                      ) : (
                        <BellOff className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}

