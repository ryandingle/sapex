'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { TokenIcon } from '@/components/ui/TokenIcon'
import { SUPPORTED_TOKENS, Token } from '@/lib/tokens'
import { Search, ChevronDown, TrendingUp, X } from 'lucide-react'

interface TokenModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedToken?: string
  onSelectToken: (token: Token) => void
  exclude?: string
}

export function TokenModal({ open, onOpenChange, selectedToken, onSelectToken, exclude }: TokenModalProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const availableTokens = SUPPORTED_TOKENS.filter(
    (token) => token.symbol !== exclude
  )

  // Popular tokens for quick access
  const popularTokens = ['ETH', 'USDC', 'USDT', 'WBTC', 'DAI'].map(symbol => 
    SUPPORTED_TOKENS.find(t => t.symbol === symbol)
  ).filter(Boolean) as Token[]

  const filteredTokens = availableTokens.filter((token) => {
    const query = searchQuery.toLowerCase()
    return (
      token.symbol.toLowerCase().includes(query) ||
      token.name.toLowerCase().includes(query)
    )
  })

  const handleSelectToken = (token: Token) => {
    onSelectToken(token)
    onOpenChange(false)
    setSearchQuery('')
  }

  const formatAddress = (address: string) => {
    if (address === 'native') return ''
    if (address.length <= 10) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] flex flex-col p-0" onClose={() => onOpenChange(false)}>
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-800">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl">Select a token</DialogTitle>
        </DialogHeader>

        {/* Search Bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tokens"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-12 pr-9 sm:pr-10 h-10 sm:h-12 bg-[#0d0e10] border-gray-700 text-white text-sm sm:text-base"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#2a2b30] rounded transition-colors">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Quick Access: Swap across networks */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-medium text-gray-400">Swap across networks</span>
            <button className="p-1 hover:bg-[#2a2b30] rounded transition-colors">
              <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {popularTokens.slice(0, 5).map((token) => (
              <button
                key={token.symbol}
                onClick={() => handleSelectToken(token)}
                className="flex flex-col items-center gap-1 sm:gap-2 flex-1 hover:opacity-80 transition-opacity"
              >
                <TokenIcon 
                  address={token.address} 
                  symbol={token.symbol} 
                  size={48}
                  fallback={token.icon}
                />
                <span className="text-xs text-gray-400">{token.symbol}</span>
              </button>
            ))}
            {popularTokens.length > 5 && (
              <button className="flex flex-col items-center gap-2 flex-1 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-[#2a2b30] flex items-center justify-center text-sm font-semibold text-gray-400 border border-gray-700">
                  6+
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Tokens by 24H volume */}
        <div className="px-4 sm:px-6 py-2 sm:py-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-400">Tokens by 24H volume</span>
          </div>
        </div>

        {/* Token List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            {filteredTokens.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No tokens found</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredTokens.map((token) => {
                  const isSelected = token.symbol === selectedToken
                  return (
                    <button
                      key={token.symbol}
                      onClick={() => handleSelectToken(token)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl
                        transition-all duration-200
                        ${isSelected 
                          ? 'bg-[#2a2b30]' 
                          : 'hover:bg-[#2a2b30]'
                        }
                      `}
                    >
                      <TokenIcon 
                        address={token.address} 
                        symbol={token.symbol} 
                        size={40}
                        fallback={token.icon}
                      />
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-semibold text-white text-sm sm:text-base truncate">
                          {token.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs sm:text-sm text-gray-400">{token.symbol}</span>
                          {token.address !== 'native' && (
                            <span className="text-xs text-gray-500">
                              {formatAddress(token.address)}
                            </span>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

