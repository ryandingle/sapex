'use client'

import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut, AlertCircle, Settings, Power } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SettingsDropdown } from '@/components/settings/SettingsDropdown'

export function WalletConnect() {
  const { account, connect, disconnect, isConnecting, isConnected } = useWallet()
  const [hasMetaMask, setHasMetaMask] = useState(true)
  const [slippage, setSlippage] = useState(0.5)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasMetaMask(!!window.ethereum)
      
      // Load slippage from localStorage
      const saved = localStorage.getItem('swapit-settings')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed.slippage) {
            setSlippage(parsed.slippage)
          }
        } catch (error) {
          console.error('Error loading settings:', error)
        }
      }
    }
  }, [])

  if (isConnected && account) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Wallet Address with Icon */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1e1f24] border border-gray-800/50 hover:border-gray-700 transition-colors">
          {/* Green status indicator (clover-like) */}
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
          </div>
          <span className="text-sm font-medium text-white">
            {account.slice(0, 4)}...{account.slice(-4)}
          </span>
        </div>
        
        {/* Settings Dropdown */}
        <SettingsDropdown
          slippage={slippage}
          onSlippageChange={(newSlippage) => {
            setSlippage(newSlippage)
            // Dispatch custom event so TradingInterface can listen to it
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('slippageChanged', { detail: newSlippage }))
            }
          }}
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gray-400 hover:text-white hover:bg-[#1e1f24] rounded-lg"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
          }
        />
        
        {/* Disconnect Icon */}
        <Button
          variant="ghost"
          size="icon"
          onClick={disconnect}
          className="h-9 w-9 text-gray-400 hover:text-red-400 hover:bg-[#1e1f24] rounded-lg"
          title="Disconnect"
        >
          <Power className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  if (!hasMetaMask) {
    return (
      <Button
        size="sm"
        onClick={() => window.open('https://metamask.io/download/', '_blank')}
        variant="outline"
      >
        <AlertCircle className="w-4 h-4 mr-2" />
        Install MetaMask
      </Button>
    )
  }

  return (
    <Button 
      onClick={connect} 
      disabled={isConnecting} 
      size="sm"
      className="hover-glow transition-all duration-200"
    >
      <Wallet className={`w-4 h-4 mr-2 transition-transform duration-200 ${isConnecting ? 'animate-pulse' : 'hover:rotate-12'}`} />
      {isConnecting ? (
        <span className="flex items-center gap-2">
          <span className="animate-pulse-slow">●</span>
          Connecting...
        </span>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  )
}

