'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export function Logo({ size = 32, showText = true, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 flex-shrink-0 ${className}`}>
      <Image
        src="/logo-icon.svg"
        alt="Sapex Logo"
        width={size}
        height={size}
        className="flex-shrink-0"
        priority
      />
      {showText && (
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          Sapex
        </h1>
      )}
    </Link>
  )
}

