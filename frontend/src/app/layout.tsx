import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { TokenBubbles } from '@/components/ui/TokenBubbles'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sapex - Crypto Trading Platform',
  description: 'Buy and sell cryptocurrencies with 0.08% platform fee - Lowest fees in the market!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen bg-[#0d0e10] relative overflow-x-hidden">
            <div className="dark-gradient-bg">
              <div className="particle-1" />
              <div className="particle-2" />
            </div>
            <TokenBubbles />
            
            <Navigation />
            
            <div className="relative z-10 pt-16 sm:pt-20 min-h-[calc(100vh-4rem)]">
              {children}
            </div>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  )
}

