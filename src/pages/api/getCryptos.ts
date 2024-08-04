// pages/api/getCryptos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 使用 CoinGecko API 獲取所有加密貨幣資訊
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100, // 每頁最多100個結果
        page: 1, // 獲取第1頁的結果
        sparkline: false,
      },
    });

    // 從響應中提取所需的數據
    const data = response.data;

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'Cryptocurrency data not found' });
    }
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    res.status(500).json({ error: 'Error fetching cryptocurrency data' });
  }
}
