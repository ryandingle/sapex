# Web3 Bank - Crypto Trading Platform

A complete web3 bank platform where users can buy and sell cryptocurrencies with a 0.1% platform fee - the lowest in the market!

## 🚀 Features

- 🪙 **Buy and sell cryptocurrencies** - Trade ETH, USDC, USDT, WBTC, DAI
- 💰 **0.1% platform fee** - Lowest fees in the market! (vs 0.3% on Uniswap, SushiSwap, etc.)
- 📊 **Real-time price updates** - Live prices from Uniswap
- 💼 **Portfolio tracking** - View all your holdings in one place
- 📜 **Transaction history** - Complete history of all swaps
- 🔐 **Wallet integration** - MetaMask support
- 📈 **Price charts** - Real-time exchange rates
- 💵 **Earnings tracking** - Monitor platform fees collected

## 📁 Project Structure

```
swapit/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/      # Next.js pages
│   │   ├── components/  # React components
│   │   ├── hooks/    # Custom hooks
│   │   └── lib/      # Utilities
│   └── package.json
├── contracts/         # Solidity smart contracts
│   ├── Web3Bank.sol  # Main contract
│   └── scripts/       # Deployment scripts
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension
- Ethereum RPC endpoint (Alchemy, Infura, etc.)
- For contract deployment: Hardhat and private key

### 1. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...  # After deploying contract
NEXT_PUBLIC_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_CHAIN_ID=1
```

Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 2. Smart Contract Deployment

```bash
cd contracts
npm install
```

Create `.env` file:

```env
PRIVATE_KEY=your_private_key
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
FEE_RECIPIENT=0x...  # Address to receive platform fees
ETHERSCAN_API_KEY=your_etherscan_api_key  # Optional, for verification
```

Compile contracts:

```bash
npm run compile
```

Deploy to mainnet:

```bash
npm run deploy -- --network mainnet
```

**Important**: After deployment, update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `frontend/.env.local`

### 3. Test on Sepolia (Recommended for testing)

```bash
# Update contracts/.env with SEPOLIA_RPC_URL
npm run deploy -- --network sepolia
```

## 📋 Environment Variables

### Frontend (.env.local)

| Variable                         | Description                              | Example                                    |
| -------------------------------- | ---------------------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_CONTRACT_ADDRESS`   | Deployed Web3Bank contract address       | `0x1234...`                                |
| `NEXT_PUBLIC_RPC_URL`            | Ethereum RPC endpoint                    | `https://eth-mainnet.g.alchemy.com/v2/KEY` |
| `NEXT_PUBLIC_CHAIN_ID`           | Chain ID (1 for mainnet, 2020 for Ronin) | `1` or `2020`                              |
| `NEXT_PUBLIC_PHPC_TOKEN_ADDRESS` | PHPC token address on Ronin              | `0x...` (PHPC contract on Ronin)           |
| `NEXT_PUBLIC_RONIN_RPC_URL`      | Ronin RPC endpoint (optional)            | `https://api.roninchain.com/rpc`           |

### Contracts (.env)

| Variable            | Description                          |
| ------------------- | ------------------------------------ |
| `PRIVATE_KEY`       | Private key for deployment           |
| `MAINNET_RPC_URL`   | Mainnet RPC endpoint                 |
| `SEPOLIA_RPC_URL`   | Sepolia testnet RPC endpoint         |
| `FEE_RECIPIENT`     | Address to receive platform fees     |
| `ETHERSCAN_API_KEY` | For contract verification (optional) |

## 💰 Fee Comparison

| Platform      | Fee       | Savings vs Web3 Bank |
| ------------- | --------- | -------------------- |
| **Web3 Bank** | **0.1%**  | **Best rate!**       |
| Uniswap       | 0.3%      | 3x higher            |
| SushiSwap     | 0.3%      | 3x higher            |
| PancakeSwap   | 0.25%     | 2.5x higher          |
| Curve         | 0.04-0.4% | Varies by pool       |
| Balancer      | 0.1-1%    | Up to 10x higher     |

**Web3 Bank offers the lowest fees in the market!**

## smart Contract Details

The `Web3Bank.sol` contract:

- **Platform Fee**: 0.1% (10 basis points) on all transactions - Lower than Uniswap (0.3%), SushiSwap (0.3%), PancakeSwap (0.25%), and all major DEX platforms
- **Functions**:
  - `swapETHForTokens()` - Buy tokens with ETH
  - `swapTokensForETH()` - Sell tokens for ETH
  - `swapTokensForTokens()` - Swap between tokens
  - `getUserTransactions()` - Get user transaction history
  - `withdrawFees()` - Owner can withdraw collected fees

### Fee Collection

- Fees are automatically collected on each swap
- ETH fees are sent directly to `feeRecipient`
- Token fees are transferred to `feeRecipient` before swap
- Owner can withdraw fees using `withdrawFees()`

## 🎨 Supported Tokens

### Stablecoins

- **ETH** - Ethereum (native)
- **USDC** - USD Coin
- **USDT** - Tether
- **DAI** - Dai Stablecoin
- **TUSD** - TrueUSD
- **BUSD** - Binance USD
- **FRAX** - Frax

### Bitcoin & Wrapped Assets

- **WBTC** - Wrapped Bitcoin
- **WETH** - Wrapped Ethereum
- **stETH** - Lido Staked Ether
- **rETH** - Rocket Pool ETH
- **cbETH** - Coinbase Wrapped Staked ETH

### DeFi Tokens

- **UNI** - Uniswap
- **AAVE** - Aave
- **COMP** - Compound
- **MKR** - Maker
- **SNX** - Synthetix Network Token
- **CRV** - Curve DAO Token
- **SUSHI** - SushiSwap
- **1INCH** - 1inch Network
- **BAL** - Balancer
- **YFI** - yearn.finance
- **LDO** - Lido DAO
- **RPL** - Rocket Pool
- **ZRX** - 0x Protocol

### Layer 2 & Scaling

- **MATIC** - Polygon
- **ARB** - Arbitrum
- **OP** - Optimism
- **LRC** - Loopring

### Oracle & Infrastructure

- **LINK** - Chainlink
- **GRT** - The Graph
- **ENS** - Ethereum Name Service

### Gaming & NFTs

- **APE** - ApeCoin
- **ENJ** - Enjin Coin
- **MANA** - Decentraland
- **SAND** - The Sandbox
- **AXS** - Axie Infinity
- **GALA** - Gala
- **CHZ** - Chiliz

### Meme Coins

- **SHIB** - Shiba Inu
- **PEPE** - Pepe

### Other

- **BNB** - Binance Coin
- **FTM** - Fantom
- **FTT** - FTX Token
- **BAT** - Basic Attention Token
- **ZEC** - Zcash
- **PHPC** - Philippine Peso Coin (Ronin network)

## 📱 Usage

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask
2. **Select Tokens**: Choose from/to tokens
3. **Enter Amount**: Type the amount you want to swap
4. **Review**: Check exchange rate, fees, and estimated output
5. **Swap**: Click "Buy" or "Sell" and confirm in MetaMask
6. **View Portfolio**: Check your holdings and transaction history

## 🔒 Security

- Smart contract uses OpenZeppelin's ReentrancyGuard
- All swaps go through Uniswap V2 Router
- Platform fees are calculated and transferred before swap execution
- Owner functions are protected with `onlyOwner` modifier

## 🧪 Testing

### Frontend

```bash
cd frontend
npm run dev
```

### Contracts

```bash
cd contracts
npm test
```

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions, please open an issue on GitHub.
