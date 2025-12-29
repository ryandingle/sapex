'use client'

import { useState, useMemo } from 'react'
import { Transaction } from '@/hooks/useTransactions'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getTokenByAddress } from '@/lib/tokens'
import { ArrowRight, Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TransactionHistoryProps {
  transactions: Transaction[]
  loading?: boolean
}

type DateFilter = 'all' | 'today' | '7d' | '30d' | 'custom'

export function TransactionHistory({
  transactions,
  loading,
}: TransactionHistoryProps) {
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isExporting, setIsExporting] = useState(false)

  const filteredTransactions = useMemo(() => {
    if (dateFilter === 'all') {
      return transactions
    }

    const now = new Date()
    let start: Date

    switch (dateFilter) {
      case 'today':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case '7d':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case 'custom':
        if (startDate && endDate) {
          const customStart = new Date(startDate)
          const customEnd = new Date(endDate)
          customEnd.setHours(23, 59, 59, 999) // End of day
          return transactions.filter((tx) => {
            const txDate = new Date(tx.timestamp)
            return txDate >= customStart && txDate <= customEnd
          })
        }
        return transactions
      default:
        return transactions
    }

    if (dateFilter !== 'custom') {
      return transactions.filter((tx) => {
        const txDate = new Date(tx.timestamp)
        return txDate >= start
      })
    }

    return transactions
  }, [transactions, dateFilter, startDate, endDate])

  const exportToCSV = () => {
    if (filteredTransactions.length === 0) {
      alert('No transactions to export')
      return
    }

    setIsExporting(true)

    // Prepare CSV data
    const headers = ['Date', 'Time', 'Token In', 'Amount In', 'Token Out', 'Amount Out', 'Fee', 'Transaction Hash']
    const rows = filteredTransactions.map(tx => {
      const tokenIn = getTokenByAddress(tx.tokenIn)
      const tokenOut = getTokenByAddress(tx.tokenOut)
      const tokenInSymbol = tx.tokenIn === '0x0000000000000000000000000000000000000000' ? 'ETH' : tokenIn?.symbol || 'UNKNOWN'
      const tokenOutSymbol = tx.tokenOut === '0x0000000000000000000000000000000000000000' ? 'ETH' : tokenOut?.symbol || 'UNKNOWN'
      
      const date = new Date(tx.timestamp)
      return [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        tokenInSymbol,
        tx.amountIn,
        tokenOutSymbol,
        tx.amountOut,
        tx.feeAmount,
        'N/A', // Transaction hash not available in current Transaction interface
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
    const dateRange = dateFilter === 'all' ? 'all' : dateFilter === 'custom' ? `${startDate}-${endDate}` : dateFilter
    link.setAttribute('download', `swapit-transactions-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setIsExporting(false)
  }

  const exportToJSON = () => {
    if (filteredTransactions.length === 0) {
      alert('No transactions to export')
      return
    }

    setIsExporting(true)

    const exportData = {
      exportDate: new Date().toISOString(),
      dateFilter,
      totalTransactions: filteredTransactions.length,
      transactions: filteredTransactions.map(tx => {
        const tokenIn = getTokenByAddress(tx.tokenIn)
        const tokenOut = getTokenByAddress(tx.tokenOut)
        const tokenInSymbol = tx.tokenIn === '0x0000000000000000000000000000000000000000' ? 'ETH' : tokenIn?.symbol || 'UNKNOWN'
        const tokenOutSymbol = tx.tokenOut === '0x0000000000000000000000000000000000000000' ? 'ETH' : tokenOut?.symbol || 'UNKNOWN'
        
        return {
          ...tx,
          tokenInSymbol,
          tokenOutSymbol,
          date: new Date(tx.timestamp).toISOString(),
        }
      }),
    }

    const jsonContent = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    const dateRange = dateFilter === 'all' ? 'all' : dateFilter === 'custom' ? `${startDate}-${endDate}` : dateFilter
    link.setAttribute('download', `swapit-transactions-${dateRange}-${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setIsExporting(false)
  }

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Date Filter and Export */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
            <Select value={dateFilter} onValueChange={(value) => setDateFilter(value as DateFilter)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-[#0d0e10] border-gray-700 text-white text-sm sm:text-base">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e1f24] border-gray-800">
                <SelectItem value="all" className="text-white hover:bg-[#2a2b30]">All time</SelectItem>
                <SelectItem value="today" className="text-white hover:bg-[#2a2b30]">Today</SelectItem>
                <SelectItem value="7d" className="text-white hover:bg-[#2a2b30]">Last 7 days</SelectItem>
                <SelectItem value="30d" className="text-white hover:bg-[#2a2b30]">Last 30 days</SelectItem>
                <SelectItem value="custom" className="text-white hover:bg-[#2a2b30]">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Buttons */}
          {filteredTransactions.length > 0 && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                onClick={exportToCSV}
                disabled={isExporting}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-initial border-gray-700 text-gray-300 hover:bg-[#1e1f24] hover:text-white hover:border-gray-600 text-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={exportToJSON}
                disabled={isExporting}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-initial border-gray-700 text-gray-300 hover:bg-[#1e1f24] hover:text-white hover:border-gray-600 text-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
            </div>
          )}
        </div>

        {/* Custom Date Range Inputs */}
        {dateFilter === 'custom' && (
          <div className="bg-[#0d0e10] rounded-xl border border-gray-800/50 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-400 mb-2 block">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pl-10 h-11 bg-[#1e1f24] border-gray-700 text-white text-sm sm:text-base hover:border-gray-600 focus:border-[#3B82F6]"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-xs sm:text-sm font-medium text-gray-400 mb-2 block">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="pl-10 h-11 bg-[#1e1f24] border-gray-700 text-white text-sm sm:text-base hover:border-gray-600 focus:border-[#3B82F6]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredTransactions.length !== transactions.length && (
          <p className="text-sm text-gray-400">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
        )}
      </div>

      {/* Transaction List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No transactions yet</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No transactions found for selected date range</p>
          </div>
        ) : (
          filteredTransactions.map((tx, index) => (
            <TransactionItem key={index} transaction={tx} />
          ))
        )}
      </div>
    </div>
  )
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const tokenIn = getTokenByAddress(transaction.tokenIn)
  const tokenOut = getTokenByAddress(transaction.tokenOut)

  const tokenInSymbol =
    transaction.tokenIn === '0x0000000000000000000000000000000000000000'
      ? 'ETH'
      : tokenIn?.symbol || 'UNKNOWN'
  const tokenOutSymbol =
    transaction.tokenOut === '0x0000000000000000000000000000000000000000'
      ? 'ETH'
      : tokenOut?.symbol || 'UNKNOWN'

  const date = new Date(transaction.timestamp)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-white">{tokenInSymbol}</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-white">{tokenOutSymbol}</span>
            </div>
            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-sm text-white">
              {parseFloat(transaction.amountOut).toFixed(4)} {tokenOutSymbol}
            </p>
            <p className="text-xs text-gray-400">
              Fee: {parseFloat(transaction.feeAmount).toFixed(6)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

