// 定義加密貨幣的資料型態
export interface Crypto {
  symbol: string;
  name: string;
  current_price: number;
  total_volume: number;
  image: string;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  full_name?: string;
}

// 加密貨幣市場 Table List
export interface MarketsProps {
  coinInfo: Crypto[];
}