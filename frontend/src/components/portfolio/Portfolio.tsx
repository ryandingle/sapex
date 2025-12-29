'use client'

import { useWallet } from '@/hooks/useWallet'
import { useTransactions } from '@/hooks/useTransactions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Holdings } from './Holdings'
import { Earnings } from './Earnings'
import { TransactionHistory } from '@/components/transactions/TransactionHistory'

export function Portfolio() {
  const { account } = useWallet()
  const { transactions, totalFeesPaid } = useTransactions(account)

  if (!account) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-400">
            Connect wallet to view portfolio
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-scale-in">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl text-white">Portfolio</CardTitle>
        <CardDescription className="text-gray-400 text-sm">
          Your crypto holdings and trading activity
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <Tabs defaultValue="holdings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-9 sm:h-10">
            <TabsTrigger value="holdings" className="text-xs sm:text-sm">Holdings</TabsTrigger>
            <TabsTrigger value="earnings" className="text-xs sm:text-sm">Earnings</TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">History</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="mt-4">
            <Holdings account={account} />
          </TabsContent>

          <TabsContent value="earnings" className="mt-4">
            <Earnings totalFeesPaid={totalFeesPaid} />
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <TransactionHistory transactions={transactions} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

