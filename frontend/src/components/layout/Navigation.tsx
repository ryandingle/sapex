'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Menu, X } from 'lucide-react'
import { TokenModal } from '@/components/trading/TokenModal'
import { SUPPORTED_TOKENS, Token } from '@/lib/tokens'
import { cn } from '@/lib/utils'

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navItems = [
    { href: '/', label: 'Trade', exact: true },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/price-alerts', label: 'Price Alerts' },
    { href: '/watchlist', label: 'Watchlist' },
    { href: '/gas-tracker', label: 'Gas Tracker' },
  ]

  const handleTokenSelect = (token: Token) => {
    setIsTokenModalOpen(false)
    setSearchQuery('')
    // Navigate to trade page with token as query parameter
    router.push(`/?token=${token.symbol}`)
  }

  const handleSearchClick = () => {
    setIsTokenModalOpen(true)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0e10]/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-4 w-full">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-white">
              Sapex
            </h1>
          </Link>
          
          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1 flex-shrink-0">
            {navItems.map((item) => {
              const isActive = item.exact 
                ? pathname === item.href 
                : pathname?.startsWith(item.href)
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#1e1f24] text-white"
                      : "text-gray-400 hover:text-white hover:bg-[#1e1f24]/50"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Center Search Bar - Desktop */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={handleSearchClick}
                onFocus={handleSearchClick}
                className="pl-12 h-12 bg-[#1e1f24] border-gray-700 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-[#3B82F6] cursor-pointer text-base"
              />
            </div>
          </div>

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={handleSearchClick}
          >
            <Search className="w-5 h-5" />
          </Button>
        
          {/* Wallet Connect */}
          <div className="flex-shrink-0">
            <WalletConnect />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800/50 bg-[#0d0e10]">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = item.exact 
                  ? pathname === item.href 
                  : pathname?.startsWith(item.href)
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                      isActive
                        ? "bg-[#1e1f24] text-white"
                        : "text-gray-400 hover:text-white hover:bg-[#1e1f24]/50"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Token Modal */}
      <TokenModal
        open={isTokenModalOpen}
        onOpenChange={setIsTokenModalOpen}
        onSelectToken={handleTokenSelect}
      />
    </>
  )
}

