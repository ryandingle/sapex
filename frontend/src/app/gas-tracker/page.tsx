'use client'

import { GasTracker } from '@/components/features/GasTracker'

export default function GasTrackerPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-6 sm:mb-8 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Gas Price Tracker</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Monitor Ethereum gas prices for optimal trading times
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <GasTracker />
      </div>
    </div>
  )
}

