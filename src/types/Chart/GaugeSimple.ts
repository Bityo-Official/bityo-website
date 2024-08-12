export interface GaugeSimpleProps {
  option: any;
}

export interface FearAndGreedProps {
  value: number;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
}

export interface BitcoinHistoryPriceProps {
  time: string;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  close: number;
  conversionType: string;
  conversionSymbol: string;
}

export interface MergedDataItem {
  date: string;
  fngValue: number;
  open: number;
  close: number;
  low: number;
  high: number;
}