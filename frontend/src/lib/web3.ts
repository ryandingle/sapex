import { ethers } from 'ethers'

export function getProvider() {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum)
  }
  return new ethers.JsonRpcProvider(getRpcUrl())
}

export function getContractAddress(): string {
  const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
  // Return empty string if it's a placeholder
  if (address === '0x...' || address.trim() === '' || !address.startsWith('0x')) {
    return ''
  }
  return address
}

export function getChainId(): number {
  return parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1', 10)
}

// Ronin network configuration
export const RONIN_CHAIN_ID = 2020
export const RONIN_RPC_URL = process.env.NEXT_PUBLIC_RONIN_RPC_URL || 'https://api.roninchain.com/rpc'

export function isRoninNetwork(): boolean {
  return getChainId() === RONIN_CHAIN_ID
}

export function getRpcUrl(): string {
  if (isRoninNetwork()) {
    return RONIN_RPC_URL
  }
  return process.env.NEXT_PUBLIC_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo'
}

