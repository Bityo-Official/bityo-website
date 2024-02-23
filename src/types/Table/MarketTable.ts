export interface TableProps {
  // data: any;
  className?: string;
  head: string[];
  rows: {
    img: string;
    name: string;
    full_name: string;
    price: number;
  }[];
  tab: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
}