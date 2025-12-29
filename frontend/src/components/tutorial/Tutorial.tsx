'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface TutorialStep {
  id: string
  title: string
  description: string
  target?: string // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to SwapIt! 🎉',
    description: 'SwapIt is a decentralized exchange with the lowest fees (0.08%) in the market. Let\'s take a quick tour of the platform.',
    position: 'bottom',
  },
  {
    id: 'network',
    title: 'Select Networks',
    description: 'Click here to choose your source and destination networks. SwapIt supports Ethereum, Arbitrum, Ronin, and more!',
    target: '[data-tutorial="network-indicator"]',
    position: 'bottom',
  },
  {
    id: 'sell',
    title: 'Sell Token',
    description: 'Enter the amount you want to sell and select the token. You can click "Balance" to use your full balance.',
    target: '[data-tutorial="sell-section"]',
    position: 'bottom',
  },
  {
    id: 'swap',
    title: 'Swap Tokens & Networks',
    description: 'Click this circular arrow button to quickly swap between your selected tokens and networks. This will reverse both the tokens and the networks.',
    target: '[data-tutorial="swap-button"]',
    position: 'right',
  },
  {
    id: 'buy',
    title: 'Buy Token',
    description: 'This section shows what you\'ll receive after the swap. You can click "Enter buy amount" above to input the desired amount instead of the sell amount.',
    target: '[data-tutorial="buy-section"]',
    position: 'top',
  },
  {
    id: 'quote',
    title: 'Get Quote',
    description: 'Before swapping, click "Get Quote" to see detailed information about fees, slippage, and estimated output.',
    target: '[data-tutorial="quote-button"]',
    position: 'top',
  },
  {
    id: 'swap-action',
    title: 'Execute Swap',
    description: 'Click the "Swap" button below to execute your transaction. Make sure you have enough balance and gas fees in your wallet. The button will be enabled once you enter a valid amount.',
    target: '[data-tutorial="swap-action"]',
    position: 'top',
  },
  {
    id: 'complete',
    title: 'You\'re All Set! 🚀',
    description: 'You now know how to use SwapIt! Start trading with the lowest fees in the market. Happy swapping!',
    position: 'bottom',
  },
]

const TUTORIAL_STORAGE_KEY = 'swapit-tutorial-completed'

export function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Check if tutorial was already completed
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem(TUTORIAL_STORAGE_KEY)
      if (!completed) {
        // Show tutorial after a short delay
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  // Prevent scrolling when tutorial is open
  useEffect(() => {
    if (isVisible) {
      // Save current scroll position
      const scrollY = window.scrollY
      // Disable body scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restore scroll position
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const step = TUTORIAL_STEPS[currentStep]
    if (step?.target) {
      // Wait a bit for elements to render
      const timer = setTimeout(() => {
        const element = document.querySelector(step.target!) as HTMLElement
        if (element) {
          // Check if element is visible
          const rect = element.getBoundingClientRect()
          const isVisible = rect.width > 0 && rect.height > 0
          
          if (isVisible) {
            setHighlightedElement(element)
            // Scroll element into view
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          } else {
            setHighlightedElement(null)
          }
        } else {
          setHighlightedElement(null)
        }
      }, 100)

      return () => {
        clearTimeout(timer)
        setHighlightedElement(null)
      }
    } else {
      setHighlightedElement(null)
    }
  }, [currentStep, isVisible])

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    setIsVisible(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true')
      // Restore scroll
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }

  if (!isVisible) return null

  const step = TUTORIAL_STEPS[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1

  // Calculate position for tooltip
  const getTooltipPosition = () => {
    if (!highlightedElement || !step.target) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    }

    const rect = highlightedElement.getBoundingClientRect()
    const scrollY = window.scrollY
    const scrollX = window.scrollX

    switch (step.position) {
      case 'top':
        return {
          top: `${rect.top + scrollY - 10}px`,
          left: `${rect.left + scrollX + rect.width / 2}px`,
          transform: 'translate(-50%, -100%)',
        }
      case 'bottom':
        return {
          top: `${rect.bottom + scrollY + 10}px`,
          left: `${rect.left + scrollX + rect.width / 2}px`,
          transform: 'translate(-50%, 0)',
        }
      case 'left':
        return {
          top: `${rect.top + scrollY + rect.height / 2}px`,
          left: `${rect.left + scrollX - 10}px`,
          transform: 'translate(-100%, -50%)',
        }
      case 'right':
        return {
          top: `${rect.top + scrollY + rect.height / 2}px`,
          left: `${rect.right + scrollX + 10}px`,
          transform: 'translate(0, -50%)',
        }
      default:
        return {
          top: `${rect.bottom + scrollY + 10}px`,
          left: `${rect.left + scrollX + rect.width / 2}px`,
          transform: 'translate(-50%, 0)',
        }
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100] bg-black/70 transition-opacity overflow-hidden"
        onClick={handleSkip}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
        style={{ touchAction: 'none' }}
      />

      {/* Highlight overlay for target element */}
      {highlightedElement && (() => {
        const rect = highlightedElement.getBoundingClientRect()
        const scrollY = window.scrollY
        const scrollX = window.scrollX
        
        return (
          <div
            className="fixed z-[101] pointer-events-none"
            style={{
              top: `${rect.top + scrollY}px`,
              left: `${rect.left + scrollX}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 0 3px #3B82F6',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              zIndex: 101,
            }}
          />
        )
      })()}

      {/* Tooltip */}
      <div
        className="fixed z-[102] min-w-[320px] max-w-[400px]"
        style={getTooltipPosition()}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-[#1e1f24] border-gray-800 shadow-2xl p-6 backdrop-blur-none">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
            </div>
            <button
              onClick={handleSkip}
              className="ml-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="mb-4">
            <div className="flex items-center gap-1">
              {TUTORIAL_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    index <= currentStep
                      ? 'bg-[#3B82F6]'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Step {currentStep + 1} of {TUTORIAL_STEPS.length}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2">
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              Skip Tutorial
            </Button>
            <div className="flex gap-2">
              {!isFirstStep && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-[#0d0e10]"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-90"
              >
                {isLastStep ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Get Started
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

