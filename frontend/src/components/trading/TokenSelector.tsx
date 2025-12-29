'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SUPPORTED_TOKENS, Token } from '@/lib/tokens'
import { TokenIcon } from '@/components/ui/TokenIcon'
import { TokenModal } from './TokenModal'

interface TokenSelectorProps {
  value: string
  onChange: (value: string) => void
  exclude?: string
}

export function TokenSelector({ value, onChange, exclude }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedToken = SUPPORTED_TOKENS.find((t) => t.symbol === value)

  const handleSelectToken = (token: Token) => {
    onChange(token.symbol)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-2 sm:px-4 py-2 h-10 sm:h-12 bg-[#2a2b30] border border-gray-700 hover:bg-[#35363b] text-white rounded-lg sm:rounded-xl transition-all duration-200 hover:border-gray-600 text-sm sm:text-base"
      >
        {selectedToken ? (
          <>
            <TokenIcon 
              address={selectedToken.address} 
              symbol={selectedToken.symbol} 
              size={24}
              fallback={selectedToken.icon}
            />
            <span className="font-medium">{selectedToken.symbol}</span>
          </>
        ) : (
          <span className="font-medium text-gray-400">Select token</span>
        )}
        <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
      </button>

      <TokenModal
        open={isOpen}
        onOpenChange={setIsOpen}
        selectedToken={value}
        onSelectToken={handleSelectToken}
        exclude={exclude}
      />
    </>
  )
}

