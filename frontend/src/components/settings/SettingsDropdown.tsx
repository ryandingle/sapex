'use client'

import { useState, useEffect } from 'react'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Info } from 'lucide-react'

interface SettingsDropdownProps {
  slippage: number
  onSlippageChange: (slippage: number) => void
  trigger: React.ReactNode
}

interface Settings {
  slippage: number
  transactionDeadline: number
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

export function SettingsDropdown({ slippage, onSlippageChange, trigger }: SettingsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [customSlippage, setCustomSlippage] = useState('')
  const [slippageError, setSlippageError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sapex-settings')
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
        setSettings({ ...DEFAULT_SETTINGS, slippage })
      }
    }
  }, [])

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
      localStorage.setItem('sapex-settings', JSON.stringify(newSettings))
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
    <Popover open={isOpen} onOpenChange={setIsOpen} trigger={trigger} align="end" side="bottom">
      <PopoverContent className="w-80 max-h-[85vh] overflow-y-auto" onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <div className="mb-4 pb-4 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-1">Settings</h3>
            <p className="text-xs text-gray-400">Manage your trading preferences</p>
          </div>

          {/* Slippage Tolerance */}
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="slippage" className="text-white text-sm font-semibold">
                Slippage Tolerance
              </Label>
              <p className="text-xs text-gray-400">
                Your transaction will revert if the price changes unfavorably by more than this percentage.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={settings.slippage === 0.5 ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSlippageChange(0.5)}
                className={`flex-1 h-9 text-xs ${
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
                className={`flex-1 h-9 text-xs ${
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
                className={`flex-1 h-9 text-xs ${
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
                className={`h-10 bg-[#0d0e10] border-gray-700 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] text-sm ${slippageError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                min="0"
                max="50"
                step="0.1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
            </div>

            {slippageError && (
              <Alert className="bg-red-500/10 border-red-500/50 py-2">
                <AlertTriangle className="w-3 h-3 text-red-500" />
                <AlertDescription className="text-red-500 text-xs">{slippageError}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Transaction Deadline */}
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="deadline" className="text-white text-sm font-semibold">
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
                className="h-10 bg-[#0d0e10] border-gray-700 text-white placeholder:text-gray-500 hover:border-gray-600 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] text-sm pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">minutes</span>
            </div>
          </div>

          {/* Expert Mode */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0e10] border border-gray-800">
            <div className="space-y-0.5 flex-1 pr-3">
              <Label htmlFor="expert-mode" className="text-white cursor-pointer text-sm font-semibold block">
                Expert Mode
              </Label>
              <p className="text-xs text-gray-400">
                Enable advanced features and bypass confirmation screens.
              </p>
            </div>
            <Switch
              id="expert-mode"
              checked={settings.expertMode}
              onCheckedChange={(checked) => handleSettingChange('expertMode', checked)}
            />
          </div>

          {/* Auto-approve Tokens */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0e10] border border-gray-800">
            <div className="space-y-0.5 flex-1 pr-3">
              <Label htmlFor="auto-approve" className="text-white cursor-pointer text-sm font-semibold block">
                Auto-approve Tokens
              </Label>
              <p className="text-xs text-gray-400">
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
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#0d0e10] border border-gray-800">
            <div className="space-y-0.5 flex-1 pr-3">
              <Label htmlFor="price-impact" className="text-white cursor-pointer text-sm font-semibold block">
                Show Price Impact Warning
              </Label>
              <p className="text-xs text-gray-400">
                Display warnings when price impact exceeds 3%.
              </p>
            </div>
            <Switch
              id="price-impact"
              checked={settings.showPriceImpactWarning}
              onCheckedChange={(checked) => handleSettingChange('showPriceImpactWarning', checked)}
            />
          </div>

          {/* Reset Button */}
          <div className="pt-3 border-t border-gray-800">
            <Button
              variant="outline"
              onClick={resetSettings}
              className="w-full h-10 border-gray-700 text-gray-300 hover:bg-[#1e1f24] hover:text-white hover:border-gray-600 transition-all text-sm"
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

