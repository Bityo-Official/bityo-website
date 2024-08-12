import { MergedDataItem } from "@/types/Chart/GaugeSimple";

// 轉換恐懼與貪婪指數等級
export const convertFngLevel = (value: number): string => {
  switch (true) {
    case value >= 0 && value < 20:
      return '極度恐懼';
    case value >= 20 && value < 40:
      return '恐懼';
    case value >= 40 && value < 60:
      return '中性';
    case value >= 60 && value < 80:
      return '貪婪';
    case value >= 80 && value <= 100:
      return '極度貪婪';
    default:
      return '';
  }
}

// 計算恐懼與貪婪指數等級天數
export const calculateDays = (mergedData: MergedDataItem[], min: number, max: number): number => {
  return mergedData.map(
    item => item.fngValue >= min && item.fngValue < max ? 1 : 0
  ).reduce((acc: number, cur: number) => acc + cur, 0);
}