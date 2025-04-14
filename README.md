<div align="center"">
  <img src="https://i.imgur.com/NSfHb6D.png" style="height: 160px;" />
</div>

# 🤖 Crypto SMA Trading Bot (TypeScript)

A simple yet powerful crypto trading bot using SMA (Simple Moving Average) crossover strategy. Built with TypeScript, Axios, and the Binance Testnet API. Ideal for testing trading logic with real-time market data.

## 📈 Strategy Overview

This bot uses the SMA crossover strategy:

- **Buy** when the short-term SMA (13 candles) crosses **above** the long-term SMA (21 candles).
- **Sell** when the short-term SMA crosses **below** the long-term SMA.
- Calculates and logs profits automatically.

---

## 🛠️ Features

- TypeScript support
- Binance Testnet integration
- Logs profit/loss from trades
- Fully containerized with Docker
- GitHub Actions CI-ready
- Deployable for free on Railway or Render

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/crypto-bot-ts.git
cd crypto-bot-ts

# Install dependencies
npm install
```

---

## 🚀 Run the Bot

```bash
# Using ts-node (dev mode)
npx ts-node src/bot.ts

# Or compile and run
npm run build
node dist/bot.js
```

---

## 🐳 Run with Docker

```bash
docker build -t crypto-bot .
docker run -it crypto-bot
```

Or using Docker Compose:

```bash
docker-compose up
```

---

## ⚙️ Configuration

- API base: Binance Testnet (`https://testnet.binance.vision`)
- Symbol: BTC/USDT
- Candlestick interval: 15 minutes

You can tweak these settings directly in `src/constants.ts` (coming soon).

---

## 📊 Example Output

```bash
Current Price: 62284.13
SMA (13): 62112.50
SMA (21): 62002.75
Bought at: 62284.13

... later ...

Sold at: 62530.00
Profit: +0.39%
```

---

## 🧪 Testnet Only

⚠️ This bot currently operates only on Binance **Testnet** — no real funds are used. It's safe to test and experiment freely.

---

## 📌 Roadmap

- [x] SMA Strategy
- [ ] RSI + MACD Integration
- [ ] Web Dashboard (Streamlit or React)
- [ ] Telegram Bot Notifications
- [ ] Real Binance Trading Support (with proper auth)

```

---

