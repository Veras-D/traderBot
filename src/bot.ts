import axios from "axios";

const SYMBOL = "BTCUSDT";
const INTERVAL = "15m";
const LIMIT = 21;
const API_URL = "https://testnet.binance.vision"; // Production: https://api.binance.com

let isBought = false;
let buyPrice: number | null = null;
let profitHistory: number[] = [];

// Kline format from Binance: [openTime, open, high, low, close, volume, closeTime, ...]
type Kline = [
  number, string, string, string, string, string,
  number, string, number, string, string, string
];

/**
 * Calculates the Simple Moving Average (SMA)
 * @param candles Array of kline data
 * @returns Average closing price
 */
function calculateSMA(candles: Kline[]): number | null {
  if (!candles.length) return null;
  const closes = candles.map(c => parseFloat(c[4]));
  const total = closes.reduce((sum, value) => sum + value, 0);
  return total / closes.length;
}

/**
 * Executes the trading logic using SMA cross strategy
 */
async function runBot(): Promise<void> {
  try {
    const endpoint = `${API_URL}/api/v3/klines?symbol=${SYMBOL}&interval=${INTERVAL}&limit=${LIMIT}`;
    const response = await axios.get<Kline[]>(endpoint);
    const data = response.data;

    const lastCandle = data[data.length - 1];
    const currentPrice = parseFloat(lastCandle[4]);

    console.clear();
    console.log(`📉 Current Price (${SYMBOL}): $${currentPrice.toFixed(2)}`);

    const sma21 = calculateSMA(data);
    const sma13 = calculateSMA(data.slice(data.length - 13));

    if (sma13 === null || sma21 === null) {
      console.log("❗ Insufficient data for SMA calculation.");
      return;
    }

    console.log(`📊 SMA(13): ${sma13.toFixed(2)} | SMA(21): ${sma21.toFixed(2)}`);
    console.log(`💼 Position Status: ${isBought ? "BOUGHT" : "NOT BOUGHT"}`);

    if (sma13 > sma21 && !isBought) {
      // Buy signal
      isBought = true;
      buyPrice = currentPrice;
      console.log(`🟢 BUY executed at $${currentPrice.toFixed(2)}`);
    } else if (sma13 < sma21 && isBought && buyPrice !== null) {
      // Sell signal
      const profit = ((currentPrice - buyPrice) / buyPrice) * 100;
      profitHistory.push(profit);
      console.log(`🔴 SELL executed at $${currentPrice.toFixed(2)}`);
      console.log(`💰 Profit from trade: ${profit.toFixed(2)}%`);
      isBought = false;
      buyPrice = null;
    } else {
      // No action
      console.log("⏳ No trade executed this round.");
    }

    console.log("📜 Profit History:", profitHistory.map(p => `${p.toFixed(2)}%`).join(" | "));
  } catch (error: any) {
    console.error("❌ Error connecting to Binance API:", error.message || error);
  }
}

// Run every 60 seconds
setInterval(runBot, 60 * 1000);
runBot();

