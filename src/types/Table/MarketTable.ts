import { CryptoProps } from '../Market/Merket';

export interface TableProps {
  className?: string;
  head: string[];
  rows: {
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
  }[];
  data: CryptoProps[];
  tab: {
    label: string;
    value: string;
    disabled: boolean;
  }[];
  selectedTab: {
    label: string;
    value: string;
    disabled: boolean;
  };
  setSelectedTab: (
    tab: {
      label: string;
      value: string;
      disabled: boolean;
    }
  ) => void;
}
