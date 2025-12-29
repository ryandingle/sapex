'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MessageSquare, HelpCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Contact Us
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Get in touch with our support team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-6 h-6 text-[#3B82F6]" />
              <CardTitle className="text-white">Email Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <a
              href="mailto:support@swapit.com"
              className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors"
            >
              support@swapit.com
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-6 h-6 text-[#3B82F6]" />
              <CardTitle className="text-white">General Inquiries</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              For general questions about SwapIt, partnerships, or media inquiries.
            </p>
            <a
              href="mailto:info@swapit.com"
              className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors"
            >
              info@swapit.com
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-6 h-6 text-[#3B82F6]" />
              <CardTitle className="text-white">Technical Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Need help with transactions, wallet connections, or technical issues?
            </p>
            <a
              href="mailto:tech@swapit.com"
              className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors"
            >
              tech@swapit.com
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              We aim to respond to all inquiries within 24 hours during business days. For urgent matters, 
              please include "URGENT" in your subject line.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

