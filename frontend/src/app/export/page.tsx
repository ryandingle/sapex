'use client'

import { TransactionExport } from '@/components/features/TransactionExport'

export default function ExportPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-6 sm:mb-8 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Export Transactions</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Download your transaction history for record keeping
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <TransactionExport />
      </div>
    </div>
  )
}

