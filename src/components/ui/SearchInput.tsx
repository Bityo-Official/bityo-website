import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useId } from "react";

interface SearchInputProps extends Omit<ComponentPropsWithoutRef<"input">, "placeholder"> {
  label: string;
  icon?: ReactNode;
}

/**
 * 取代 MarketTable 裡 @material-tailwind/react 的 Input。
 * 浮動標籤：未輸入時當 placeholder，聚焦或有內容時上移。
 */
const SearchInput = ({ label, icon, className = "", id, ...rest }: SearchInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="relative w-full">
      <input
        id={inputId}
        type="search"
        placeholder=" "
        className={
          "peer h-11 w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 pt-3 pb-1 text-sm " +
          "text-blue-gray-900 outline-none transition-colors placeholder-shown:pt-1 " +
          "focus:border-web-green dark:border-neutral-600 dark:text-neutral-100 dark:focus:border-web-green " +
          (icon ? "pr-10 " : "") +
          className
        }
        {...rest}
      />
      <label
        htmlFor={inputId}
        className={
          "pointer-events-none absolute left-3 top-1 text-[11px] text-blue-gray-500 transition-all " +
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm " +
          "peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-web-green " +
          "dark:text-neutral-400"
        }
      >
        {label}
      </label>
      {icon && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-gray-500 dark:text-neutral-300">
          {icon}
        </span>
      )}
    </div>
  );
};

export default SearchInput;
