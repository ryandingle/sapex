'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Sapex, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Platform Services</h2>
              <p className="leading-relaxed mb-3">
                Sapex provides a decentralized cryptocurrency trading platform that allows users to swap tokens across 
                multiple blockchain networks. Our platform charges a 0.08% fee on all transactions.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must have a compatible Web3 wallet to use our services</li>
                <li>You are responsible for maintaining the security of your wallet</li>
                <li>All transactions are executed on-chain and are irreversible</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
              <p className="leading-relaxed mb-3">As a user of Sapex, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the platform only for lawful purposes</li>
                <li>Not engage in any fraudulent or malicious activities</li>
                <li>Ensure you have sufficient funds for transactions including gas fees</li>
                <li>Verify all transaction details before confirming</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Platform Fees</h2>
              <p className="leading-relaxed">
                Sapex charges a platform fee of 0.08% on all swap transactions. This fee is deducted from the input amount 
                before the swap is executed. Additional network gas fees apply and are paid directly to the blockchain network.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Risks and Disclaimers</h2>
              <p className="leading-relaxed mb-3">
                Cryptocurrency trading involves substantial risk. By using Sapex, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cryptocurrency prices are highly volatile</li>
                <li>You may lose all or part of your investment</li>
                <li>Sapex is not responsible for any losses incurred</li>
                <li>Smart contracts are subject to potential bugs or vulnerabilities</li>
                <li>Network congestion may affect transaction times and costs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
              <p className="leading-relaxed">
                Sapex, its operators, and affiliates shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                resulting from your use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Modifications to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
                Your continued use of the platform after changes are posted constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Contact Information</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at support@sapex.app.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

