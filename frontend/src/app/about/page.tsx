'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          About SwapIt
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Learn more about our mission and vision
        </p>
      </div>

      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-4 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Our Mission</h2>
              <p className="leading-relaxed">
                SwapIt is a startup company dedicated to revolutionizing cryptocurrency trading by offering the lowest 
                platform fees in the market. Our mission is to make crypto trading accessible and affordable for everyone, 
                regardless of their trading volume or experience level.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Why Choose SwapIt?</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Lowest Fees:</strong> Just 0.08% platform fee - the most competitive rate in the market</li>
                <li><strong>Multi-Chain Support:</strong> Trade across Ethereum, Ronin, and other networks</li>
                <li><strong>Secure:</strong> Built on audited smart contracts using OpenZeppelin standards</li>
                <li><strong>User-Friendly:</strong> Intuitive interface designed for both beginners and experts</li>
                <li><strong>Transparent:</strong> All transactions are on-chain and verifiable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Our Technology</h2>
              <p className="leading-relaxed mb-3">
                SwapIt is built on cutting-edge Web3 technology:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Smart contracts deployed on multiple blockchain networks</li>
                <li>Integration with Uniswap V2 Router for deep liquidity</li>
                <li>Real-time price feeds and transaction processing</li>
                <li>Secure wallet integration with MetaMask and other Web3 wallets</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">The Team</h2>
              <p className="leading-relaxed">
                SwapIt is built by a passionate team of blockchain developers and crypto enthusiasts who believe in making 
                decentralized finance accessible to everyone. We are committed to continuous improvement and innovation 
                in the DeFi space.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Our Commitment</h2>
              <p className="leading-relaxed">
                As a startup, we are committed to providing the best possible trading experience while maintaining the lowest 
                fees in the industry. We continuously work on improving our platform, adding new features, and expanding 
                support for more tokens and networks.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

