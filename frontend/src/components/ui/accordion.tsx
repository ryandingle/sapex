'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionContextValue {
  value: string | null
  onValueChange: (value: string | null) => void
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

interface AccordionProps {
  type?: 'single'
  collapsible?: boolean
  children: React.ReactNode
  className?: string
}

export function Accordion({ type = 'single', collapsible = true, children, className }: AccordionProps) {
  const [value, setValue] = React.useState<string | null>(null)

  const handleValueChange = React.useCallback((itemValue: string) => {
    setValue((current) => {
      if (collapsible && current === itemValue) {
        return null
      }
      return itemValue
    })
  }, [collapsible])

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div className={cn('border-b border-gray-800', className)}>
      {children}
    </div>
  )
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error('AccordionTrigger must be used within Accordion')

  const itemValue = React.useMemo(() => {
    // Extract value from parent AccordionItem
    const parent = (children as any)?.props?.value || ''
    return parent
  }, [children])

  const isOpen = context.value === itemValue

  return (
    <button
      type="button"
      onClick={() => context.onValueChange(itemValue)}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-[#3B82F6] [&[data-state=open]>svg]:rotate-180',
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200" />
    </button>
  )
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error('AccordionContent must be used within Accordion')

  const itemValue = React.useMemo(() => {
    const parent = (children as any)?.props?.value || ''
    return parent
  }, [children])

  if (context.value !== itemValue) return null

  return (
    <div className={cn('overflow-hidden text-sm transition-all', className)}>
      <div className="pb-4 pt-0">
        {children}
      </div>
    </div>
  )
}

