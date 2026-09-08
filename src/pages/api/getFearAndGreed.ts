import type { NextApiRequest, NextApiResponse } from 'next';
import type { MergedDataItem } from '@/types/Chart/GaugeSimple';

const FNG_API = 'https://api.alternative.me/fng/?limit=365&date_format=cn';
// 原本用的 min-api.cryptocompare.com 現在需要 API key（回 401），
// 改用 Binance 的公開 klines（免金鑰）取得 BTC 每日 OHLC
const BTC_KLINES = 'https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=365';

interface FngEntry {
  value: string;
  value_classification: string;
  timestamp: string; // date_format=cn 會回 "YYYY-MM-DD"
}

// Binance kline: [openTime, open, high, low, close, volume, ...]
type Kline = [number, string, string, string, string, string, ...unknown[]];

const toIsoDate = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/**
 * @openapi
 * /api/getFearAndGreed:
 *   get:
 *     description: 取得近一年的恐懼與貪婪指數，並對齊 BTC 每日 OHLC
 *     tags:
 *       - Market
 *     responses:
 *       200:
 *         description: 成功回傳合併後的資料
 *       502:
 *         description: 上游 API 錯誤
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [fngRes, klineRes] = await Promise.all([
      fetch(FNG_API, { signal: AbortSignal.timeout(10_000) }),
      fetch(BTC_KLINES, { signal: AbortSignal.timeout(10_000) }),
    ]);

    if (!fngRes.ok || !klineRes.ok) {
      return res.status(502).json({
        error: `Upstream error (fng=${fngRes.status}, klines=${klineRes.status})`,
      });
    }

    const fngJson: { data: FngEntry[] } = await fngRes.json();
    const klines: Kline[] = await klineRes.json();

    // 以 UTC 日期字串對齊兩邊資料（避免依賴執行環境的時區）
    const fngMap = new Map<string, number>();
    for (const item of fngJson.data ?? []) {
      const date = item.timestamp?.length === 10
        ? item.timestamp
        : toIsoDate(Number(item.timestamp) * 1000);
      fngMap.set(date, Number(item.value));
    }

    const merged: MergedDataItem[] = [];
    for (const k of klines) {
      const date = toIsoDate(k[0]);
      const fngValue = fngMap.get(date);
      if (fngValue === undefined) continue;
      merged.push({
        date,
        fngValue,
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
      });
    }

    // 資料每日才更新一次，快取久一點
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json(merged);
  } catch (error) {
    console.error('Error fetching fear and greed data:', error);
    return res.status(502).json({ error: 'Failed to fetch fear and greed data' });
  }
};

export default handler;
