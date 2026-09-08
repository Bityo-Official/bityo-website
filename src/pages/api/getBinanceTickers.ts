import type { NextApiRequest, NextApiResponse } from 'next';

// data-api.binance.vision 是 Binance 的公開市場資料端點，不需金鑰
const BINANCE_24HR = 'https://data-api.binance.vision/api/v3/ticker/24hr';

interface Binance24hrTicker {
  symbol: string;
  lastPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  priceChangePercent: string;
}

export interface TickerSnapshot {
  symbol: string;
  price: number;
  high: number;
  low: number;
  volume: number;
  changePercent: number;
}

/**
 * @openapi
 * /api/getBinanceTickers:
 *   get:
 *     description: 取得 Binance 所有 USDT 交易對的 24 小時行情快照
 *     tags:
 *       - Market
 *     responses:
 *       200:
 *         description: 成功回傳行情快照
 *       502:
 *         description: 上游 Binance API 錯誤
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const upstream = await fetch(BINANCE_24HR, { signal: AbortSignal.timeout(10_000) });

    if (!upstream.ok) {
      return res.status(502).json({ error: `Binance responded ${upstream.status}` });
    }

    const all: Binance24hrTicker[] = await upstream.json();

    // 只留 USDT 交易對，並改成精簡欄位：
    // 原始回應約 1.9MB，過濾後大幅縮小，避免瀏覽器下載整包
    const tickers: TickerSnapshot[] = all
      .filter((t) => t.symbol.endsWith('USDT'))
      .map((t) => ({
        symbol: t.symbol,
        price: parseFloat(t.lastPrice),
        high: parseFloat(t.highPrice),
        low: parseFloat(t.lowPrice),
        volume: parseFloat(t.volume),
        changePercent: parseFloat(t.priceChangePercent),
      }));

    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    return res.status(200).json(tickers);
  } catch (error) {
    console.error('Error fetching Binance tickers:', error);
    return res.status(502).json({ error: 'Failed to fetch Binance tickers' });
  }
};

export default handler;
