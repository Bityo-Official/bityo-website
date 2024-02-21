// 整個 Card 的 Data
export interface CardData {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

// Card 的左邊的 Data
export interface InfomationData {
  className?: string;
  children?: React.ReactNode;
}

// Card 的左上的 Data
export interface TitleData {
  text: string;
  className?: string;
}

// Card 的左下的 Data
export interface DescriptionData {
  text: string;
  className?: string;
}

// Card 的右邊的 Data
export interface PhotoData {
  src: string;
  className?: string;
}
