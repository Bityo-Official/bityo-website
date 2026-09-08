import { cn } from "@/util/cn";

export interface TabItem {
  label: string;
  value: string;
  disabled: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (tab: TabItem) => void;
  className?: string;
}

/**
 * 取代 @material-tailwind/react 的 Tabs/TabsHeader/Tab。
 * 用 role="tablist" 的按鈕列，選取項以背景色標示（原本的 indicator 效果）。
 */
const Tabs = ({ tabs, value, onChange, className }: TabsProps) => (
  <div
    role="tablist"
    className={cn("flex rounded-lg border border-neutral-300 bg-blue-gray-50/60 p-1 dark:border-neutral-700 dark:bg-transparent", className)}
  >
    {tabs.map((tab) => {
      const selected = tab.value === value;
      return (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={selected}
          disabled={tab.disabled}
          onClick={() => onChange(tab)}
          className={cn(
            "flex-1 whitespace-nowrap rounded-md px-4 py-1.5 text-center font-sans text-base font-normal transition-colors",
            "disabled:pointer-events-none disabled:opacity-50",
            selected
              ? "bg-neutral-300 text-blue-gray-900 shadow-xs dark:bg-neutral-200"
              : "text-blue-gray-900 hover:bg-neutral-300/50 dark:text-neutral-300 dark:hover:bg-neutral-700/50",
          )}
        >
          {tab.label}
        </button>
      );
    })}
  </div>
);

export default Tabs;
