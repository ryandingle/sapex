'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Book, Link as LinkIcon } from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Documentation
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Developer resources and API documentation
        </p>
      </div>

      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Book className="w-6 h-6 text-[#3B82F6]" />
              <CardTitle className="text-white">Getting Started</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Contract</h3>
              <p className="leading-relaxed mb-3">
                Sapex uses a smart contract deployed on multiple blockchain networks. The contract handles token swaps 
                and collects platform fees.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Platform Fee: 0.08% (8 basis points)</li>
                <li>Built with Solidity and OpenZeppelin contracts</li>
                <li>Reentrancy protection and security best practices</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Supported Networks</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Ethereum Mainnet</li>
                <li>Ronin Network (for PHPC)</li>
                <li>Additional networks coming soon</li>
              </ul>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Code className="w-6 h-6 text-[#3B82F6]" />
              <CardTitle className="text-white">API Integration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Contract Functions</h3>
              <div className="bg-[#0d0e10] rounded-lg p-4 font-mono text-sm space-y-2">
                <div>
                  <span className="text-[#3B82F6]">function</span>{' '}
                  <span className="text-white">swapETHForTokens</span>
                  <span className="text-gray-500">(address tokenOut, uint256 minAmountOut, uint256 deadline)</span>
                </div>
                <div>
                  <span className="text-[#3B82F6]">function</span>{' '}
                  <span className="text-white">swapTokensForETH</span>
                  <span className="text-gray-500">(address tokenIn, uint256 amountIn, uint256 minAmountOut, uint256 deadline)</span>
                </div>
                <div>
                  <span className="text-[#3B82F6]">function</span>{' '}
                  <span className="text-white">swapTokensForTokens</span>
                  <span className="text-gray-500">(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, uint256 deadline)</span>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <LinkIcon className="w-6 h-6 text-[#3B82F6]" />
              <CardTitle className="text-white">Resources</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Useful Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/terms" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/security" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
                    Security Information
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
                    Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

