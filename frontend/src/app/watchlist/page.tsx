'use client'

import { TokenWatchlist } from '@/components/features/TokenWatchlist'

export default function WatchlistPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-6 sm:mb-8 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Token Watchlist</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Track your favorite tokens and their prices
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <TokenWatchlist />
      </div>
    </div>
  )
}

