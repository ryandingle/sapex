'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText } from 'lucide-react'
import { useTransactions } from '@/hooks/useTransactions'
import { useWallet } from '@/hooks/useWallet'

export function TransactionExport() {
  const { account } = useWallet()
  const { transactions } = useTransactions(account)
  const [isExporting, setIsExporting] = useState(false)

  const exportToCSV = () => {
    if (!transactions || transactions.length === 0) {
      alert('No transactions to export')
      return
    }

    setIsExporting(true)

    // Prepare CSV data
    const headers = ['Date', 'Time', 'Type', 'Token In', 'Amount In', 'Token Out', 'Amount Out', 'Fee', 'Transaction Hash']
    const rows = transactions.map(tx => {
      const date = new Date(tx.timestamp * 1000)
      return [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        tx.type,
        tx.tokenInSymbol,
        tx.amountIn,
        tx.tokenOutSymbol,
        tx.amountOut,
        tx.feeAmount,
        tx.txHash || 'N/A',
      ]
    })

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `swapit-transactions-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setIsExporting(false)
  }

  const exportToJSON = () => {
    if (!transactions || transactions.length === 0) {
      alert('No transactions to export')
      return
    }

    setIsExporting(true)

    const exportData = {
      account,
      exportDate: new Date().toISOString(),
      totalTransactions: transactions.length,
      transactions: transactions.map(tx => ({
        ...tx,
        date: new Date(tx.timestamp * 1000).toISOString(),
      })),
    }

    const jsonContent = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `swapit-transactions-${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setIsExporting(false)
  }

  const transactionCount = transactions?.length || 0

  return (
    <Card className="bg-[#1e1f24] border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <FileText className="w-5 h-5" />
          Export Transactions
        </CardTitle>
        <CardDescription>
          Download your transaction history for record keeping
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-[#0d0e10] border border-gray-800">
          <p className="text-sm text-gray-300 mb-2">
            Total Transactions: <span className="font-semibold text-white">{transactionCount}</span>
          </p>
          {transactionCount === 0 && (
            <p className="text-xs text-gray-400">No transactions found. Make some swaps to see your history here.</p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={exportToCSV}
            disabled={transactionCount === 0 || isExporting}
            className="flex-1"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button
            onClick={exportToJSON}
            disabled={transactionCount === 0 || isExporting}
            className="flex-1"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            JSON
          </Button>
        </div>

        {isExporting && (
          <p className="text-xs text-center text-gray-400">Exporting...</p>
        )}
      </CardContent>
    </Card>
  )
}

