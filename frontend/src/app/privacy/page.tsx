'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
              <p className="leading-relaxed">
                SwapIt ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we 
                collect, use, and safeguard your information when you use our decentralized cryptocurrency trading platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
              <p className="leading-relaxed mb-3">As a decentralized platform, we collect minimal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Wallet Address:</strong> Public blockchain addresses when you connect your wallet</li>
                <li><strong>Transaction Data:</strong> On-chain transaction information that is publicly available</li>
                <li><strong>Usage Data:</strong> Anonymous analytics to improve our platform</li>
                <li><strong>Device Information:</strong> Browser type, device type, and IP address for security purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-3">We use collected information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our trading services</li>
                <li>Process transactions and calculate fees</li>
                <li>Improve platform functionality and user experience</li>
                <li>Detect and prevent fraud or security issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Decentralized Nature</h2>
              <p className="leading-relaxed">
                SwapIt is a decentralized platform. Your wallet connection is handled locally by your browser. We do not 
                store your private keys, seed phrases, or have access to your wallet. All transactions are executed directly 
                through your connected wallet on the blockchain.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Data Storage</h2>
              <p className="leading-relaxed">
                We do not store personal information on our servers. Transaction data is stored on the blockchain and is 
                publicly accessible. We may store anonymous analytics data to improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Third-Party Services</h2>
              <p className="leading-relaxed mb-3">
                Our platform integrates with third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Blockchain Networks:</strong> Ethereum, Ronin, and other supported networks</li>
                <li><strong>DEX Routers:</strong> Uniswap V2 Router for token swaps</li>
                <li><strong>RPC Providers:</strong> For blockchain data access</li>
              </ul>
              <p className="leading-relaxed mt-3">
                These services have their own privacy policies. We are not responsible for their data practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Cookies and Tracking</h2>
              <p className="leading-relaxed">
                We use essential cookies to maintain your session and improve platform functionality. We do not use tracking 
                cookies or sell your data to third parties. You can disable cookies in your browser settings, though this may 
                affect platform functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Your Rights</h2>
              <p className="leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Disconnect your wallet at any time</li>
                <li>Review transaction history stored on the blockchain</li>
                <li>Request information about data we may have collected</li>
                <li>Opt out of non-essential data collection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Security</h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures to protect our platform. However, as a decentralized service, 
                you are responsible for securing your wallet and private keys. We are not responsible for losses due to 
                compromised wallets or user error.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Changes to Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated 
                "Last updated" date. Your continued use of the platform after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Contact Us</h2>
              <p className="leading-relaxed">
                For questions about this Privacy Policy, contact us at support@swapit.com.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

