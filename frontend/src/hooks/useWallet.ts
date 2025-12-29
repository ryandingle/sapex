import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { getChainId } from '@/lib/web3'

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isDisconnected, setIsDisconnected] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) {
      return
    }

    // Don't auto-reconnect if user explicitly disconnected
    if (isDisconnected) {
      return
    }

    let isMounted = true

    const initProvider = async () => {
      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum!)
        
        if (isMounted) {
          setProvider(browserProvider)
        }

        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (isMounted && accounts && accounts.length > 0 && !isDisconnected) {
            setAccount(accounts[0])
          }

          const network = await browserProvider.getNetwork()
          if (isMounted) {
            setChainId(Number(network.chainId))
          }
        } catch (error) {
          console.error('Error initializing wallet:', error)
        }
      } catch (error) {
        console.error('Error creating provider:', error)
      }
    }

    initProvider()

    const handleAccountsChanged = (accounts: string[]) => {
      if (isMounted && !isDisconnected) {
        setAccount(accounts[0] || null)
        if (accounts.length === 0) {
          // User disconnected from MetaMask
          setIsDisconnected(true)
        }
      }
    }

    const handleChainChanged = () => {
      // Reload page on chain change
      window.location.reload()
    }

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }

    return () => {
      isMounted = false
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [isDisconnected]) // Re-run if disconnect state changes

  const connect = async () => {
    if (typeof window === 'undefined') {
      alert('This application requires a browser environment')
      return
    }

    if (!window.ethereum) {
      alert('Please install MetaMask! Visit https://metamask.io/ to get started.')
      return
    }

    // Check if MetaMask is locked
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length === 0) {
        // MetaMask is installed but locked or no accounts
      }
    } catch (error) {
      console.error('Error checking MetaMask:', error)
    }

    setIsConnecting(true)
    try {
      const browserProvider = new ethers.BrowserProvider(window.ethereum)
      
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      
      const signer = await browserProvider.getSigner()
      const address = await signer.getAddress()
      const network = await browserProvider.getNetwork()
      
      setAccount(address)
      setProvider(browserProvider)
      setChainId(Number(network.chainId))
      setIsDisconnected(false) // Reset disconnect flag when connecting

      // Check if on correct chain
      const expectedChainId = getChainId()
      if (Number(network.chainId) !== expectedChainId) {
        try {
          // Try to switch chain
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
          })
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            // Chain not added, try to add it
            if (expectedChainId === 2020) {
              // Ronin network
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: `0x${expectedChainId.toString(16)}`,
                    chainName: 'Ronin',
                    nativeCurrency: {
                      name: 'RON',
                      symbol: 'RON',
                      decimals: 18,
                    },
                    rpcUrls: ['https://api.roninchain.com/rpc'],
                    blockExplorerUrls: ['https://app.roninchain.com/'],
                  }],
                })
              } catch (addError) {
                alert('Please add Ronin network to MetaMask manually')
              }
            } else {
              alert('Please add the network to MetaMask')
            }
          } else if (switchError.code !== 4001) {
            console.error('Error switching chain:', switchError)
          }
        }
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error)
      
      // Handle specific error codes
      if (error.code === 4001) {
        // User rejected the request
        console.log('User rejected connection request')
      } else if (error.code === -32002) {
        alert('A connection request is already pending. Please check MetaMask.')
      } else {
        alert(`Error connecting wallet: ${error.message || 'Please make sure MetaMask is unlocked and try again.'}`)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setProvider(null)
    setChainId(null)
    setIsDisconnected(true)
    
    // Try to revoke permissions (may not work in all browsers)
    if (window.ethereum && window.ethereum.request) {
      // Some wallets support wallet_revokePermissions
      try {
        window.ethereum.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }],
        }).catch(() => {
          // Ignore errors - not all wallets support this
        })
      } catch (error) {
        // Ignore errors
      }
    }
  }

  return {
    account,
    provider,
    connect,
    disconnect,
    isConnecting,
    chainId,
    isConnected: !!account,
  }
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, handler: (...args: any[]) => void) => void
      removeListener: (event: string, handler: (...args: any[]) => void) => void
      isMetaMask?: boolean
    }
  }
}

