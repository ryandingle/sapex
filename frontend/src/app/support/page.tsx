'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, Book, MessageCircle, Mail } from 'lucide-react'
import Link from 'next/link'

export default function SupportPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Support Center
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Get help and find answers to your questions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Link href="/faq">
          <Card className="hover:scale-105 transition-transform cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="w-6 h-6 text-[#3B82F6]" />
                <CardTitle className="text-white">FAQ</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Find answers to frequently asked questions about SwapIt, trading, fees, and more.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs">
          <Card className="hover:scale-105 transition-transform cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Book className="w-6 h-6 text-[#3B82F6]" />
                <CardTitle className="text-white">Documentation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Technical documentation, API references, and developer resources.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/contact">
          <Card className="hover:scale-105 transition-transform cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-6 h-6 text-[#3B82F6]" />
                <CardTitle className="text-white">Contact Us</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Reach out to our support team via email for personalized assistance.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-6 h-6 text-[#3B82F6]" />
              <CardTitle className="text-white">Email Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-3">
              For immediate assistance, email us at:
            </p>
            <a
              href="mailto:support@swapit.com"
              className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors"
            >
              support@swapit.com
            </a>
            <p className="text-gray-400 text-sm mt-3">
              Response time: Within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

