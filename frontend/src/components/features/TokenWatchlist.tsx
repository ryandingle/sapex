'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TokenIcon } from '@/components/ui/TokenIcon'
import { Star, StarOff, TrendingUp, TrendingDown, Search } from 'lucide-react'
import { SUPPORTED_TOKENS, Token, getTokenBySymbol } from '@/lib/tokens'
import { usePrice } from '@/hooks/usePrice'
import { getETHPriceInUSD } from '@/lib/prices'

export function TokenWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  // Load watchlist from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sapex-watchlist')
      if (saved) {
        try {
          setWatchlist(JSON.parse(saved))
        } catch (error) {
          console.error('Error loading watchlist:', error)
        }
      }
    }
  }, [])

  const saveWatchlist = (newWatchlist: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sapex-watchlist', JSON.stringify(newWatchlist))
      setWatchlist(newWatchlist)
    }
  }

  const toggleToken = (symbol: string) => {
    if (watchlist.includes(symbol)) {
      saveWatchlist(watchlist.filter(s => s !== symbol))
    } else {
      saveWatchlist([...watchlist, symbol])
    }
  }

  const filteredTokens = SUPPORTED_TOKENS.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const watchlistTokens = filteredTokens.filter(token => watchlist.includes(token.symbol))
  const otherTokens = filteredTokens.filter(token => !watchlist.includes(token.symbol))

  return (
    <Card className="bg-[#1e1f24] border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Star className="w-5 h-5" />
          Token Watchlist
        </CardTitle>
        <CardDescription>
          Track your favorite tokens and their prices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-[#0d0e10] border-gray-700 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] text-base"
          />
        </div>

        {/* Watchlist Tokens */}
        {watchlistTokens.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Watched Tokens</h3>
            <div className="space-y-2">
              {watchlistTokens.map((token) => (
                <TokenWatchlistItem
                  key={token.symbol}
                  token={token}
                  isWatched={true}
                  onToggle={() => toggleToken(token.symbol)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Tokens */}
        {otherTokens.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">
              {watchlistTokens.length > 0 ? 'All Tokens' : 'Available Tokens'}
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {otherTokens.map((token) => (
                <TokenWatchlistItem
                  key={token.symbol}
                  token={token}
                  isWatched={false}
                  onToggle={() => toggleToken(token.symbol)}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface TokenWatchlistItemProps {
  token: Token
  isWatched: boolean
  onToggle: () => void
}

function TokenWatchlistItem({ token, isWatched, onToggle }: TokenWatchlistItemProps) {
  const { price: priceInETH, loading } = usePrice(token.symbol, 'ETH')
  const [priceInUSD, setPriceInUSD] = useState<number>(0)
  const [priceChange, setPriceChange] = useState<number>(0)

  // Convert ETH price to USD
  useEffect(() => {
    if (priceInETH && !loading) {
      if (token.symbol === 'ETH') {
        getETHPriceInUSD().then(ethPrice => {
          setPriceInUSD(ethPrice)
        })
      } else if (token.symbol === 'USDC' || token.symbol === 'USDT' || token.symbol === 'DAI') {
        setPriceInUSD(1) // Stablecoins are ~$1
      } else {
        // Convert ETH price to USD
        getETHPriceInUSD().then(ethPrice => {
          setPriceInUSD(priceInETH * ethPrice)
        })
      }
    }
  }, [priceInETH, loading, token.symbol])

  // Mock price change (in production, use real 24h change data)
  useEffect(() => {
    // Simulate price change
    const change = (Math.random() - 0.5) * 10 // -5% to +5%
    setPriceChange(change)
  }, [])

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0e10] border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <TokenIcon 
          address={token.address} 
          symbol={token.symbol} 
          size={32}
          fallback={token.icon}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">{token.symbol}</span>
            <span className="text-xs text-gray-400">{token.name}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            {loading ? (
              <span className="text-xs text-gray-500">Loading...</span>
            ) : (
              <>
                <span className="text-xs text-gray-300">${priceInUSD.toFixed(2)}</span>
                <span className={`text-xs flex items-center gap-0.5 ${
                  priceChange >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {priceChange >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(priceChange).toFixed(2)}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className={`h-8 w-8 ${isWatched ? 'text-yellow-500' : 'text-gray-400'}`}
      >
        {isWatched ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
      </Button>
    </div>
  )
}

