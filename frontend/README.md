# Sapex Frontend

Next.js frontend application for the Sapex crypto trading platform.

## Features

- 🪙 Buy and sell cryptocurrencies
- 💰 Real-time price updates
- 💼 Portfolio tracking
- 📜 Transaction history
- 🔐 Wallet integration (MetaMask)
- 📈 Price charts

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_CHAIN_ID=1
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
│   ├── trading/     # Trading interface
│   ├── portfolio/   # Portfolio components
│   ├── wallet/      # Wallet connection
│   └── ui/          # UI components
├── hooks/           # Custom React hooks
└── lib/             # Utilities and configurations
```

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ethers.js v6
- TanStack Query

