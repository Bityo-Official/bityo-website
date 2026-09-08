export type ChipColor =
  | "blue-gray" | "gray" | "brown" | "deep-orange" | "orange" | "amber" | "yellow"
  | "lime" | "light-green" | "green" | "teal" | "cyan" | "light-blue" | "blue"
  | "indigo" | "deep-purple" | "purple" | "pink" | "red";

export type ChipSize = "sm" | "md" | "lg";

/**
 * 完整 class 字串（不可用字串拼接），否則 Tailwind 掃不到。
 * 原本 @material-tailwind 的 Material 色票在此對應到 Tailwind 內建色。
 */
const GHOST_COLOR_CLASSES: Record<ChipColor, string> = {
  "blue-gray": "bg-slate-500/20 text-slate-900",
  gray: "bg-gray-500/20 text-gray-900",
  brown: "bg-stone-500/20 text-stone-900",
  "deep-orange": "bg-orange-600/20 text-orange-900",
  orange: "bg-orange-500/20 text-orange-900",
  amber: "bg-amber-500/20 text-amber-900",
  yellow: "bg-yellow-500/20 text-yellow-900",
  lime: "bg-lime-500/20 text-lime-900",
  "light-green": "bg-green-400/20 text-green-900",
  green: "bg-green-500/20 text-green-900",
  teal: "bg-teal-500/20 text-teal-900",
  cyan: "bg-cyan-500/20 text-cyan-900",
  "light-blue": "bg-sky-500/20 text-sky-900",
  blue: "bg-blue-500/20 text-blue-900",
  indigo: "bg-indigo-500/20 text-indigo-900",
  "deep-purple": "bg-violet-600/20 text-violet-900",
  purple: "bg-purple-500/20 text-purple-900",
  pink: "bg-pink-500/20 text-pink-900",
  red: "bg-red-500/20 text-red-900",
};

const SIZE_CLASSES: Record<ChipSize, string> = {
  sm: "px-2 py-1 text-[11px]",
  md: "px-2.5 py-1.5 text-xs",
  lg: "px-3 py-2 text-xs",
};

interface ChipProps {
  value: React.ReactNode;
  color?: ChipColor;
  size?: ChipSize;
  className?: string;
}

/** 取代 @material-tailwind/react 的 Chip（目前只有用到 ghost 樣式） */
const Chip = ({ value, color = "gray", size = "md", className = "" }: ChipProps) => (
  <div
    className={`inline-block whitespace-nowrap rounded-lg text-center align-baseline font-sans font-bold uppercase leading-none ${GHOST_COLOR_CLASSES[color]} ${SIZE_CLASSES[size]} ${className}`}
  >
    {value}
  </div>
);

export default Chip;
