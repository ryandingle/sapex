'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Disclaimer
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Important information about using Sapex
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6 text-gray-300">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">Risk Warning</h3>
                <p className="text-sm leading-relaxed">
                  Cryptocurrency trading involves substantial risk of loss. Only trade with funds you can afford to lose.
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. No Financial Advice</h2>
              <p className="leading-relaxed">
                Sapex does not provide financial, investment, or trading advice. All information on our platform is for 
                informational purposes only. You should conduct your own research and consult with a qualified financial 
                advisor before making any trading decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Market Risks</h2>
              <p className="leading-relaxed mb-3">
                Cryptocurrency markets are highly volatile and unpredictable. You may experience:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Significant price fluctuations</li>
                <li>Potential loss of your entire investment</li>
                <li>Market manipulation and extreme volatility</li>
                <li>Liquidity risks in certain trading pairs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Technical Risks</h2>
              <p className="leading-relaxed mb-3">
                Using blockchain technology and smart contracts involves technical risks:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Smart contract bugs or vulnerabilities</li>
                <li>Network congestion affecting transaction times and costs</li>
                <li>Wallet security risks if not properly secured</li>
                <li>Potential for irreversible transactions</li>
                <li>Compatibility issues with different wallets or networks</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Regulatory Risks</h2>
              <p className="leading-relaxed">
                Cryptocurrency regulations vary by jurisdiction and may change. You are responsible for ensuring your use 
                of Sapex complies with all applicable laws and regulations in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. No Guarantees</h2>
              <p className="leading-relaxed">
                Sapex makes no guarantees regarding:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>The accuracy of price information or exchange rates</li>
                <li>The availability or uptime of our platform</li>
                <li>The security of your funds or transactions</li>
                <li>The performance or profitability of any trades</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. User Responsibility</h2>
              <p className="leading-relaxed">
                You are solely responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Securing your wallet and private keys</li>
                <li>Verifying all transaction details before confirming</li>
                <li>Understanding the risks involved in cryptocurrency trading</li>
                <li>Complying with applicable laws and regulations</li>
                <li>Any losses incurred from using our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Platform Availability</h2>
              <p className="leading-relaxed">
                Sapex is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free 
                service. The platform may be unavailable due to maintenance, technical issues, or other reasons beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Acceptance</h2>
              <p className="leading-relaxed">
                By using Sapex, you acknowledge that you have read, understood, and agree to this disclaimer. You understand 
                the risks involved and accept full responsibility for your trading decisions and any resulting losses.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

