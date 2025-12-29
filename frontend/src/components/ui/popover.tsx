'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PopoverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  trigger: React.ReactNode
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export function Popover({ open, onOpenChange, children, trigger, align = 'end', side = 'bottom' }: PopoverProps) {
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (open) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (
          triggerRef.current && 
          !triggerRef.current.contains(target) &&
          contentRef.current &&
          !contentRef.current.contains(target)
        ) {
          onOpenChange(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onOpenChange])

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => onOpenChange(!open)}>
        {trigger}
      </div>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => onOpenChange(false)}
          />
          <div
            ref={contentRef}
            data-popover-content
            className={cn(
              'absolute z-50 bg-[#1e1f24] border border-gray-800 rounded-xl shadow-2xl min-w-[320px] max-w-md',
              side === 'bottom' && 'top-full mt-2',
              side === 'top' && 'bottom-full mb-2',
              side === 'right' && 'left-full ml-2',
              side === 'left' && 'right-full mr-2',
              align === 'end' && 'right-0',
              align === 'start' && 'left-0',
              align === 'center' && 'left-1/2 -translate-x-1/2'
            )}
          >
            {children}
          </div>
        </>
      )}
    </div>
  )
}

interface PopoverContentProps {
  children: React.ReactNode
  className?: string
  onClose?: () => void
}

export function PopoverContent({ children, className, onClose }: PopoverContentProps) {
  return (
    <div className={cn('p-4 max-h-[80vh] overflow-y-auto', className)}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2b30] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      {children}
    </div>
  )
}

