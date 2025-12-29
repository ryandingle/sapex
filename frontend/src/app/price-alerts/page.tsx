'use client'

import { PriceAlerts } from '@/components/features/PriceAlerts'

export default function PriceAlertsPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-6 sm:mb-8 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Price Alerts</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Get notified when token prices reach your target
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <PriceAlerts />
      </div>
    </div>
  )
}

