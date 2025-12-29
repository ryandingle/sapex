'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DollarSign, Activity } from 'lucide-react'

export function Earnings({ totalFeesPaid }: { totalFeesPaid: number }) {
  // Platform earns 0.08% of all transaction volume
  // This is a simplified calculation - in reality, you'd track platform earnings separately
  const platformEarnings = totalFeesPaid * 0.1

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Platform Earnings
          </CardTitle>
          <CardDescription className="text-gray-400">
            Total fees collected from your transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">
            ${platformEarnings.toFixed(2)}
          </div>
          <p className="text-sm text-gray-400 mt-2">
            From ${totalFeesPaid.toFixed(2)} total transaction volume
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="w-5 h-5" />
            Fee Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Platform Fee Rate</span>
            <span className="font-semibold text-white">0.08%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Volume</span>
            <span className="font-semibold text-white">${totalFeesPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Your Earnings</span>
            <span className="font-semibold text-green-400">
              ${platformEarnings.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

