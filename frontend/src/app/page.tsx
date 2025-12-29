'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { TradingInterface } from '@/components/trading/TradingInterface'
import { Tutorial } from '@/components/tutorial/Tutorial'
import { TokenBubbles } from '@/components/ui/TokenBubbles'
import { SUPPORTED_TOKENS } from '@/lib/tokens'
import { Bell, Star, Gauge, FileText, ArrowRight } from 'lucide-react'

export default function Home() {
  const searchParams = useSearchParams()
  const [initialToken, setInitialToken] = useState<string | null>(null)

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      // Validate that the token exists in supported tokens
      const token = SUPPORTED_TOKENS.find(t => t.symbol.toUpperCase() === tokenParam.toUpperCase())
      if (token) {
        setInitialToken(token.symbol)
      }
    }
  }, [searchParams])

  return (
    <>
      <Tutorial />
      <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-7xl">
      <div className="text-center mb-6 sm:mb-8 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          BUY/SELL Crypto anytime, anywhere with lowest fee of{' '}
          <span className="text-[#3B82F6]">0.08%</span> in the market
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm px-2">
          Buy and sell crypto on multiple networks including Ethereum, Ronin, and more.
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <TradingInterface initialToken={initialToken} />
      </div>

      {/* Introduction Section - Eye-catching design */}
      <div className="mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="relative overflow-hidden">
          {/* Gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/20 via-[#60A5FA]/20 to-[#3B82F6]/20 blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-[#1e1f24] to-[#0d0e10] rounded-2xl sm:rounded-3xl border-2 border-[#3B82F6]/30 p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#3B82F6]/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-[#3B82F6]/10 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl">🚀</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Welcome to SwapIt
                </h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4 text-left">
                <p className="text-gray-200 leading-relaxed text-sm sm:text-base md:text-lg">
                  We are a <span className="text-white font-bold">startup company</span> dedicated to revolutionizing cryptocurrency trading by offering the{' '}
                  <span className="text-white font-bold bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
                    lowest platform fees
                  </span>{' '}
                  in the market. Our mission is to make crypto trading accessible and affordable for everyone.
                </p>
                
                <div className="bg-[#0d0e10]/50 rounded-xl p-3 sm:p-4 md:p-5 border border-[#3B82F6]/20">
                  <div className="flex items-start gap-2 sm:gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse mt-1.5 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                      With just{' '}
                      <span className="text-[#3B82F6] font-bold text-lg sm:text-xl">0.08% platform fee</span>, we provide the most competitive rates compared to other major swap platforms.
                    </p>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm ml-4 sm:ml-5">
                    Trade with confidence knowing you're getting the best value for your transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Eye-catching design */}
      <div className="mt-12 sm:mt-16 md:mt-20 mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Discover advanced tools and features that make SwapIt the best choice for crypto trading
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* Price Alerts Feature Card */}
          <Link href="/price-alerts" className="group">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gray-800/50 bg-gradient-to-br from-[#1e1f24] to-[#0d0e10] p-6 sm:p-8 hover:border-[#3B82F6]/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#3B82F6]/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Price Alerts</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
                  Get notified when token prices reach your target. Never miss an opportunity to buy or sell at your desired price.
                </p>
                <div className="flex items-center text-[#3B82F6] font-medium group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Token Watchlist Feature Card */}
          <Link href="/watchlist" className="group">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gray-800/50 bg-gradient-to-br from-[#1e1f24] to-[#0d0e10] p-6 sm:p-8 hover:border-[#3B82F6]/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#3B82F6]/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Token Watchlist</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
                  Track your favorite tokens and monitor their prices in real-time. Build your personalized crypto portfolio watchlist.
                </p>
                <div className="flex items-center text-[#3B82F6] font-medium group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Gas Tracker Feature Card */}
          <Link href="/gas-tracker" className="group">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gray-800/50 bg-gradient-to-br from-[#1e1f24] to-[#0d0e10] p-6 sm:p-8 hover:border-[#3B82F6]/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#3B82F6]/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center">
                    <Gauge className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Gas Tracker</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
                  Monitor Ethereum gas prices in real-time. Find the optimal times to trade and save on transaction fees.
                </p>
                <div className="flex items-center text-[#3B82F6] font-medium group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Transaction Export Feature Card */}
          <Link href="/export" className="group">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gray-800/50 bg-gradient-to-br from-[#1e1f24] to-[#0d0e10] p-6 sm:p-8 hover:border-[#3B82F6]/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#3B82F6]/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Export Transactions</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
                  Download your complete transaction history in CSV or JSON format. Perfect for tax reporting and record keeping.
                </p>
                <div className="flex items-center text-[#3B82F6] font-medium group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

