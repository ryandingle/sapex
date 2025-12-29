'use client'

import { useState } from 'react'
import { useTokenBalance } from '@/hooks/useTokenBalance'
import { usePrice } from '@/hooks/usePrice'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { TokenIcon } from '@/components/ui/TokenIcon'
import { Search } from 'lucide-react'
import { SUPPORTED_TOKENS } from '@/lib/tokens'

export function Holdings({ account }: { account: string }) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter tokens based on search query
  const filteredTokens = SUPPORTED_TOKENS.filter((token) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      token.symbol.toLowerCase().includes(query) ||
      token.name.toLowerCase().includes(query)
    )
  })

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search tokens by name or symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 bg-[#0d0e10] border-gray-700 text-white placeholder:text-gray-500 text-base"
        />
      </div>

      {/* Token List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
        {filteredTokens.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No tokens found matching "{searchQuery}"</p>
          </div>
        ) : (
          filteredTokens.map((token) => (
            <TokenHolding key={token.symbol} token={token} account={account} />
          ))
        )}
      </div>
    </div>
  )
}

function TokenHolding({
  token,
  account,
}: {
  token: typeof SUPPORTED_TOKENS[0]
  account: string
}) {
  const address = token.symbol === 'ETH' ? 'native' : token.address
  const { balance, loading } = useTokenBalance(address, account)
  const { price: ethPrice } = usePrice('ETH', 'USDC')

  let usdValue = 0
  if (token.symbol === 'ETH') {
    usdValue = parseFloat(balance) * (ethPrice || 0)
  } else if (token.symbol === 'USDC' || token.symbol === 'USDT' || token.symbol === 'DAI') {
    usdValue = parseFloat(balance)
  } else if (token.symbol === 'PHPC') {
    // PHPC to USD conversion (approximate, you may want to fetch real-time rate)
    usdValue = parseFloat(balance) * 0.018 // Approximate: 1 PHPC ≈ 0.018 USD
  } else {
    // For WBTC, we'd need BTC price, but for simplicity using balance
    usdValue = parseFloat(balance) * 40000 // Approximate BTC price
  }

  return (
    <Card className="hover-lift">
      <CardContent className="p-4">
        <div className="flex justify-between items-center transition-all duration-200 hover:scale-[1.02]">
          <div className="flex items-center gap-3">
            <TokenIcon 
              address={token.address} 
              symbol={token.symbol} 
              size={40}
              fallback={token.icon}
            />
            <div>
              <p className="font-semibold text-white">{token.symbol}</p>
              <p className="text-sm text-gray-400">{token.name}</p>
            </div>
          </div>
          <div className="text-right">
            {loading ? (
              <Skeleton className="h-4 w-20 bg-gray-700" />
            ) : (
              <>
                <p className="font-semibold text-white">{parseFloat(balance).toFixed(4)}</p>
                <p className="text-sm text-gray-400">
                  ${usdValue.toFixed(2)}
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

