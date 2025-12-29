import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { TokenBubbles } from '@/components/ui/TokenBubbles'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sapex - 0.08% Platform Fee | Lowest Crypto Trading Fees | DEX Exchange',
  description: 'Trade cryptocurrencies with only 0.08% platform fee - the lowest fees in the market! Buy and sell crypto on Ethereum, Ronin, and more networks. Cheaper than Uniswap, SushiSwap, and all major DEX platforms.',
  keywords: [
    'crypto exchange',
    'lowest trading fees',
    '0.08% platform fee',
    'decentralized exchange',
    'DEX',
    'crypto swap',
    'ethereum trading',
    'low fee crypto exchange',
    'cheapest DEX',
    'cryptocurrency trading',
    'defi exchange',
    'token swap',
    'uniswap alternative',
    'low fee trading',
    'crypto trading platform',
    'sapex',
    'sapex.app',
  ],
  authors: [{ name: 'Sapex' }],
  creator: 'Sapex',
  publisher: 'Sapex',
  metadataBase: new URL('https://sapex.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sapex.app',
    siteName: 'Sapex',
    title: 'Sapex - 0.08% Platform Fee | Lowest Crypto Trading Fees',
    description: 'Trade cryptocurrencies with only 0.08% platform fee - the lowest fees in the market! Cheaper than Uniswap, SushiSwap, and all major DEX platforms.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sapex - 0.08% Platform Fee Crypto Trading',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sapex - 0.08% Platform Fee | Lowest Crypto Trading Fees',
    description: 'Trade cryptocurrencies with only 0.08% platform fee - the lowest fees in the market!',
    images: ['/og-image.png'],
    creator: '@sapex',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Sapex',
    description: 'Cryptocurrency trading platform with 0.08% platform fee - the lowest fees in the market',
    url: 'https://sapex.app',
    logo: 'https://sapex.app/logo.svg',
    sameAs: [
      'https://twitter.com/sapex',
      'https://github.com/sapex',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '100',
    },
    offers: {
      '@type': 'Offer',
      price: '0.08',
      priceCurrency: 'USD',
      description: '0.08% platform fee on all cryptocurrency trades',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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

