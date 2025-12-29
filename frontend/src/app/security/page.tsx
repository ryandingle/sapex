'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Shield, Lock, CheckCircle } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Security
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          How we protect your funds and transactions
        </p>
      </div>

      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6 text-gray-300">
            <section>
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-[#3B82F6]" />
                <h2 className="text-xl font-semibold text-white">Smart Contract Security</h2>
              </div>
              <p className="leading-relaxed mb-3">
                Our smart contracts are built with security as the top priority:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Built on OpenZeppelin's audited contract libraries</li>
                <li>Reentrancy protection to prevent attacks</li>
                <li>Ownable pattern for access control</li>
                <li>Safe math operations to prevent overflow/underflow</li>
                <li>Deadline checks to prevent stale transactions</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <Lock className="w-6 h-6 text-[#3B82F6]" />
                <h2 className="text-xl font-semibold text-white">Decentralized Architecture</h2>
              </div>
              <p className="leading-relaxed">
                SwapIt is a fully decentralized platform. We do not hold or have access to your funds. All transactions 
                are executed directly on the blockchain through your connected wallet. Your private keys never leave your 
                device.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-[#3B82F6]" />
                <h2 className="text-xl font-semibold text-white">Best Practices</h2>
              </div>
              <p className="leading-relaxed mb-3">To ensure maximum security:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Always verify transaction details before confirming</li>
                <li>Use hardware wallets for large amounts</li>
                <li>Never share your private keys or seed phrases</li>
                <li>Double-check contract addresses before interacting</li>
                <li>Keep your wallet software updated</li>
                <li>Be cautious of phishing attempts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Transaction Security</h2>
              <p className="leading-relaxed mb-3">
                All transactions on SwapIt include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Slippage protection to prevent unfavorable trades</li>
                <li>Deadline enforcement to prevent stale transactions</li>
                <li>Minimum amount out checks</li>
                <li>On-chain verification of all swaps</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Reporting Security Issues</h2>
              <p className="leading-relaxed">
                If you discover a security vulnerability, please report it responsibly to security@swapit.com. 
                We take security seriously and will investigate all reports promptly.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

