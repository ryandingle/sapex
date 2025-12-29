'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is SwapIt?',
      answer: 'SwapIt is a cryptocurrency trading platform that allows you to buy and sell cryptocurrencies with the lowest platform fee in the market - just 0.08%. We are a startup company dedicated to making crypto trading accessible and affordable for everyone.',
    },
    {
      question: 'What is the platform fee?',
      answer: 'SwapIt charges only 0.08% platform fee on all transactions, which is significantly lower than other major swap platforms. This means you get more value for your trades.',
    },
    {
      question: 'Which networks are supported?',
      answer: 'SwapIt supports multiple blockchain networks including Ethereum, Ronin, and more. You can trade tokens across different networks seamlessly.',
    },
    {
      question: 'How do I connect my wallet?',
      answer: 'Click the "Connect Wallet" button in the top right corner. SwapIt supports MetaMask and other Web3 wallets. Make sure your wallet is connected to the correct network.',
    },
    {
      question: 'What tokens can I trade?',
      answer: 'SwapIt supports a wide range of popular cryptocurrencies including ETH, USDC, USDT, WBTC, DAI, PHPC, UNI, LINK, AAVE, and many more. You can view all supported tokens in the token selector.',
    },
    {
      question: 'Is SwapIt safe to use?',
      answer: 'Yes, SwapIt uses smart contracts that have been audited and follow industry best practices. We use OpenZeppelin contracts for security and implement reentrancy guards to protect your funds.',
    },
    {
      question: 'How do I view my transaction history?',
      answer: 'Go to the Portfolio page and click on the "History" tab. You can filter transactions by date range including Today, Last 7 days, Last 30 days, or a custom date range.',
    },
    {
      question: 'What happens if a transaction fails?',
      answer: 'If a transaction fails due to network issues or insufficient funds, your tokens will not be transferred and you will not be charged any fees. You can try the transaction again once the issue is resolved.',
    },
    {
      question: 'Can I trade PHPC (Philippine Peso Coin)?',
      answer: 'Yes! SwapIt supports PHPC on the Ronin network. The official PHPC contract address is pre-configured, so you can start trading immediately.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the Contact page or email us at support@swapit.com. We aim to respond to all inquiries within 24 hours.',
    },
  ]

  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Find answers to common questions about SwapIt
        </p>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-white">Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
                  <AccordionTrigger className="text-white hover:text-[#3B82F6] text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

