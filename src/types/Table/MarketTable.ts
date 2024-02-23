export interface TableProps {
  // data: any;
  className?: string;
  head: string[];
  rows: {
    img: string;
    name: string;
    full_name: string;
    price: number;
    vol24h: number;
    vol24p: number;
    high: number;
    low: number;
  }[];
  tab: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
}