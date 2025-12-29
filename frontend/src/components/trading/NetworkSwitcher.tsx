'use client'

import { useState, useEffect } from 'react'
import { X, ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface Network {
  id: string
  name: string
  chainId: number
  icon: string | React.ReactNode
  rpcUrl?: string
  blockExplorer?: string
}

export const SUPPORTED_NETWORKS: Network[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    chainId: 1,
    icon: '⟠',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
    blockExplorer: 'https://etherscan.io',
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    chainId: 42161,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0L20 5.7735V14.2265L10 20L0 14.2265V5.7735L10 0Z" fill="#28A0F0"/>
        <path d="M10 2L18 6.5V13.5L10 18L2 13.5V6.5L10 2Z" fill="white"/>
        <path d="M10 4L16 7.5V12.5L10 16L4 12.5V7.5L10 4Z" fill="#28A0F0"/>
      </svg>
    ),
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
  },
  {
    id: 'ronin',
    name: 'Ronin',
    chainId: 2020,
    icon: '⚔️',
    rpcUrl: 'https://api.roninchain.com/rpc',
    blockExplorer: 'https://app.roninchain.com',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    chainId: 137,
    icon: '🔷',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
  },
  {
    id: 'optimism',
    name: 'Optimism',
    chainId: 42161,
    icon: '⚡',
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorer: 'https://optimistic.etherscan.io',
  },
  {
    id: 'base',
    name: 'Base',
    chainId: 8453,
    icon: '🔵',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
  },
]

interface NetworkSwitcherProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fromNetwork: Network
  toNetwork: Network
  onNetworkChange: (fromNetwork: Network, toNetwork: Network) => void
}

export function NetworkSwitcher({
  open,
  onOpenChange,
  fromNetwork,
  toNetwork,
  onNetworkChange,
}: NetworkSwitcherProps) {
  const [selectedFrom, setSelectedFrom] = useState<Network>(fromNetwork)
  const [selectedTo, setSelectedTo] = useState<Network>(toNetwork)

  const handleSwap = () => {
    const temp = selectedFrom
    setSelectedFrom(selectedTo)
    setSelectedTo(temp)
  }

  const handleConfirm = () => {
    onNetworkChange(selectedFrom, selectedTo)
    onOpenChange(false)
  }

  const handleClose = () => {
    // Reset to original values
    setSelectedFrom(fromNetwork)
    setSelectedTo(toNetwork)
    onOpenChange(false)
  }

  useEffect(() => {
    if (open) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#1e1f24] border border-gray-800 rounded-xl shadow-2xl min-w-[400px] max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Select Networks</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Network Selection */}
          <div className="space-y-4">
            {/* From Network */}
            <div>
              <label className="text-xs font-medium text-gray-400 mb-2 block">From</label>
              <div className="grid grid-cols-2 gap-2">
                {SUPPORTED_NETWORKS.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => {
                      if (network.id !== selectedTo.id) {
                        setSelectedFrom(network)
                      }
                    }}
                    disabled={network.id === selectedTo.id}
                    className={`
                      flex items-center gap-2 p-3 rounded-lg border transition-all
                      ${
                        selectedFrom.id === network.id
                          ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-white'
                          : 'bg-[#0d0e10] border-gray-800 text-gray-300 hover:border-gray-700'
                      }
                      ${network.id === selectedTo.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      {typeof network.icon === 'string' ? (
                        <span className="text-lg">{network.icon}</span>
                      ) : (
                        network.icon
                      )}
                    </div>
                    <span className="text-sm font-medium">{network.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSwap}
                className="p-2 rounded-full bg-[#0d0e10] border border-gray-800 hover:bg-[#1e1f24] hover:border-gray-700 transition-colors"
              >
                <ArrowLeftRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* To Network */}
            <div>
              <label className="text-xs font-medium text-gray-400 mb-2 block">To</label>
              <div className="grid grid-cols-2 gap-2">
                {SUPPORTED_NETWORKS.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => {
                      if (network.id !== selectedFrom.id) {
                        setSelectedTo(network)
                      }
                    }}
                    disabled={network.id === selectedFrom.id}
                    className={`
                      flex items-center gap-2 p-3 rounded-lg border transition-all
                      ${
                        selectedTo.id === network.id
                          ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-white'
                          : 'bg-[#0d0e10] border-gray-800 text-gray-300 hover:border-gray-700'
                      }
                      ${network.id === selectedFrom.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      {typeof network.icon === 'string' ? (
                        <span className="text-lg">{network.icon}</span>
                      ) : (
                        network.icon
                      )}
                    </div>
                    <span className="text-sm font-medium">{network.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Networks Display */}
          <div className="mt-4 p-3 rounded-lg bg-[#0d0e10] border border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center">
                {typeof selectedFrom.icon === 'string' ? (
                  <span className="text-lg">{selectedFrom.icon}</span>
                ) : (
                  selectedFrom.icon
                )}
              </div>
              <span className="text-sm font-medium text-white">{selectedFrom.name}</span>
            </div>
            <ArrowLeftRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center">
                {typeof selectedTo.icon === 'string' ? (
                  <span className="text-lg">{selectedTo.icon}</span>
                ) : (
                  selectedTo.icon
                )}
              </div>
              <span className="text-sm font-medium text-white">{selectedTo.name}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-[#0d0e10]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-90"
            >
              Confirm
            </Button>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

