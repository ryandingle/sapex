'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Info } from 'lucide-react'

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  slippage: number
  onSlippageChange: (slippage: number) => void
}

interface Settings {
  slippage: number
  transactionDeadline: number // in minutes
  expertMode: boolean
  autoApproveTokens: boolean
  showPriceImpactWarning: boolean
}

const DEFAULT_SETTINGS: Settings = {
  slippage: 0.5,
  transactionDeadline: 20,
  expertMode: false,
  autoApproveTokens: false,
  showPriceImpactWarning: true,
}

export function SettingsModal({ open, onOpenChange, slippage, onSlippageChange }: SettingsModalProps) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [customSlippage, setCustomSlippage] = useState('')
  const [slippageError, setSlippageError] = useState<string | null>(null)

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('swapit-settings')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setSettings({ ...DEFAULT_SETTINGS, ...parsed })
          if (parsed.slippage) {
            onSlippageChange(parsed.slippage)
          }
        } catch (error) {
          console.error('Error loading settings:', error)
        }
      } else {
        // Use current slippage from props
        setSettings({ ...DEFAULT_SETTINGS, slippage })
      }
    }
  }, [])

  // Update custom slippage when settings.slippage changes
  useEffect(() => {
    if (settings.slippage !== 0.5 && settings.slippage !== 1 && settings.slippage !== 3) {
      setCustomSlippage(settings.slippage.toString())
    } else {
      setCustomSlippage('')
    }
  }, [settings.slippage])

  const handleSlippageChange = (value: number) => {
    if (value < 0 || value > 50) {
      setSlippageError('Slippage must be between 0% and 50%')
      return
    }
    setSlippageError(null)
    const newSettings = { ...settings, slippage: value }
    setSettings(newSettings)
    onSlippageChange(value)
    saveSettings(newSettings)
  }

  const handleCustomSlippageChange = (value: string) => {
    setCustomSlippage(value)
    if (value === '') {
      setSlippageError(null)
      return
    }
    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      setSlippageError('Please enter a valid number')
      return
    }
    if (numValue < 0 || numValue > 50) {
      setSlippageError('Slippage must be between 0% and 50%')
      return
    }
    setSlippageError(null)
    const newSettings = { ...settings, slippage: numValue }
    setSettings(newSettings)
    onSlippageChange(numValue)
    saveSettings(newSettings)
  }

  const handleSettingChange = (key: keyof Settings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  const saveSettings = (newSettings: Settings) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('swapit-settings', JSON.stringify(newSettings))
    }
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
    onSlippageChange(DEFAULT_SETTINGS.slippage)
    saveSettings(DEFAULT_SETTINGS)
    setCustomSlippage('')
    setSlippageError(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-lg w-full max-h-[90vh] overflow-y-auto" 
        onClose={() => onOpenChange(false)}
      >
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your trading preferences and transaction settings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 px-6">
          {/* Slippage Tolerance */}
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="slippage" className="text-white text-base font-semibold">
                Slippage Tolerance
              </Label>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Your transaction will revert if the price changes unfavorably by more than this percentage.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={settings.slippage === 0.5 ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSlippageChange(0.5)}
                className={`flex-1 h-10 ${
                  settings.slippage === 0.5 
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white border-0' 
                    : 'border-gray-700 text-gray-300 hover:bg-[#1e1f24] hover:text-white'
                }`}
              >
                0.5%
              </Button>
              <Button
                variant={settings.slippage === 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSlippageChange(1)}
                className={`flex-1 h-10 ${
                  settings.slippage === 1 
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white border-0' 
                    : 'border-gray-700 text-gray-300 hover:bg-[#1e1f24] hover:text-white'
                }`}
              >
                1%
              </Button>
              <Button
                variant={settings.slippage === 3 ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSlippageChange(3)}
                className={`flex-1 h-10 ${
                  settings.slippage === 3 
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white border-0' 
                    : 'border-gray-700 text-gray-300 hover:bg-[#1e1f24] hover:text-white'
                }`}
              >
                3%
              </Button>
            </div>

            <div className="relative">
              <Input
                id="slippage"
                type="number"
                placeholder="Custom"
                value={customSlippage}
                onChange={(e) => handleCustomSlippageChange(e.target.value)}
                className={`h-12 bg-[#0d0e10] border-gray-700 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] text-base ${slippageError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                min="0"
                max="50"
                step="0.1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>

            {slippageError && (
              <Alert className="bg-red-500/10 border-red-500/50">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <AlertDescription className="text-red-500 text-sm">
                  {slippageError}
                </AlertDescription>
              </Alert>
            )}

            {settings.slippage > 5 && (
              <Alert className="bg-yellow-500/10 border-yellow-500/50">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <AlertDescription className="text-yellow-500 text-sm">
                  High slippage tolerance increases the risk of receiving less than expected.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Transaction Deadline */}
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="deadline" className="text-white text-base font-semibold">
                Transaction Deadline
              </Label>
              <p className="text-xs text-gray-400">
                Your transaction will revert if it is pending for more than this duration.
              </p>
            </div>
            <div className="relative">
              <Input
                id="deadline"
                type="number"
                value={settings.transactionDeadline}
                onChange={(e) => handleSettingChange('transactionDeadline', parseInt(e.target.value) || 20)}
                min="1"
                max="60"
                className="h-12 bg-[#0d0e10] border-gray-700 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] text-base pr-20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">minutes</span>
            </div>
          </div>

          {/* Expert Mode */}
          <div className="flex items-center justify-between p-5 rounded-xl bg-[#0d0e10] border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="space-y-1.5 flex-1 pr-4">
              <Label htmlFor="expert-mode" className="text-white cursor-pointer text-base font-semibold block">
                Expert Mode
              </Label>
              <p className="text-xs text-gray-400 leading-relaxed">
                Enable advanced features and bypass confirmation screens. Use at your own risk.
              </p>
            </div>
            <Switch
              id="expert-mode"
              checked={settings.expertMode}
              onCheckedChange={(checked) => handleSettingChange('expertMode', checked)}
            />
          </div>

          {settings.expertMode && (
            <Alert className="bg-red-500/10 border-red-500/50">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <AlertDescription className="text-red-500 text-sm">
                Expert mode is enabled. You are responsible for your own transactions.
              </AlertDescription>
            </Alert>
          )}

          {/* Auto-approve Tokens */}
          <div className="flex items-center justify-between p-5 rounded-xl bg-[#0d0e10] border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="space-y-1.5 flex-1 pr-4">
              <Label htmlFor="auto-approve" className="text-white cursor-pointer text-base font-semibold block">
                Auto-approve Tokens
              </Label>
              <p className="text-xs text-gray-400 leading-relaxed">
                Automatically approve token spending without confirmation prompts.
              </p>
            </div>
            <Switch
              id="auto-approve"
              checked={settings.autoApproveTokens}
              onCheckedChange={(checked) => handleSettingChange('autoApproveTokens', checked)}
            />
          </div>

          {/* Price Impact Warning */}
          <div className="flex items-center justify-between p-5 rounded-xl bg-[#0d0e10] border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="space-y-1.5 flex-1 pr-4">
              <Label htmlFor="price-impact" className="text-white cursor-pointer text-base font-semibold block">
                Show Price Impact Warning
              </Label>
              <p className="text-xs text-gray-400 leading-relaxed">
                Display warnings when price impact exceeds 3%.
              </p>
            </div>
            <Switch
              id="price-impact"
              checked={settings.showPriceImpactWarning}
              onCheckedChange={(checked) => handleSettingChange('showPriceImpactWarning', checked)}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-800 space-y-3">
            <Button
              variant="outline"
              onClick={resetSettings}
              className="w-full h-12 border-gray-700 text-gray-300 hover:bg-[#1e1f24] hover:text-white hover:border-gray-600 transition-all"
            >
              Reset to Defaults
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full h-12 border-gray-700 text-gray-300 hover:bg-[#1e1f24] hover:text-white hover:border-gray-600 transition-all"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

