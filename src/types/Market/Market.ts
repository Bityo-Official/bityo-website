// 定義加密貨幣的資料型態
export interface CryptoProps {
  symbol: string; // 貨幣符號
  name: string; // 貨幣名稱
  current_price: number; // 當前價格
  total_volume: number; // 24小時成交量
  image: string;
  high_24h: number; // 24小時最高價
  low_24h: number; // 24小時最低價
  price_change_percentage_24h: number; // 24小時價格變動百分比
  full_name: string;
  market_cap: number; // 市值
  market_cap_rank: number; // 市值排名
  circulating_supply: number; // 流通供給量
  total_supply: number; // 總供給量
  max_supply: number; // 最大供給量
  ath: number; // 歷史最高價
  ath_change_percentage: number; // 歷史最高價變動百分比
}

// 加密貨幣市場 Table List
export interface MarketsProps {
  coinInfo: CryptoProps[];
}