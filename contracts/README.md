# Web3Bank Smart Contracts

Smart contracts for the Web3 Bank platform with 0.1% platform fee on all transactions - the lowest in the market!

## Contracts

- **Web3Bank.sol**: Main contract handling swaps with platform fee collection

## Setup

```bash
npm install
```

## Compile

```bash
npm run compile
```

## Deploy

1. Create a `.env` file:
```env
PRIVATE_KEY=your_private_key
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
FEE_RECIPIENT=0x... # Address to receive platform fees
ETHERSCAN_API_KEY=your_etherscan_api_key
```

2. Deploy:
```bash
npm run deploy -- --network mainnet
```

3. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `frontend/.env.local`

## Features

- Swap ETH for tokens
- Swap tokens for ETH
- Swap tokens for tokens
- 0.1% platform fee on all transactions (vs 0.3% on Uniswap, SushiSwap, etc.)
- Transaction history tracking
- Fee withdrawal by owner

