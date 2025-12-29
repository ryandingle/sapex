'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getTokenImageUrl } from '@/lib/tokenImages'

interface TokenIconProps {
  address: string
  symbol: string
  size?: number
  className?: string
  fallback?: string
}

/**
 * TokenIcon component that displays token images with fallback support
 */
export function TokenIcon({ 
  address, 
  symbol, 
  size = 32, 
  className = '',
  fallback 
}: TokenIconProps) {
  const [imageError, setImageError] = useState(false)
  const [fallbackError, setFallbackError] = useState(false)

  // Get primary image URL
  const primaryUrl = getTokenImageUrl(address, symbol)
  
  // Fallback URL
  const lowerAddress = address === 'native' ? '0x0000000000000000000000000000000000000000' : address.toLowerCase()
  const fallbackUrl = `https://token-icons.s3.amazonaws.com/${lowerAddress}.png`
  
  // Display fallback text/emoji
  const displayFallback = fallback || symbol.charAt(0)

  // If both images fail, show fallback text
  if (imageError && fallbackError) {
    return (
      <div 
        className={`rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-sm font-bold flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        {displayFallback}
      </div>
    )
  }

  // Try primary image URL first
  const currentUrl = imageError ? fallbackUrl : primaryUrl

  return (
    <div className={`relative flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image
        src={currentUrl}
        alt={symbol}
        width={size}
        height={size}
        className="rounded-full"
        onError={() => {
          if (!imageError) {
            setImageError(true)
          } else {
            setFallbackError(true)
          }
        }}
        unoptimized // Token images from external sources
      />
    </div>
  )
}

