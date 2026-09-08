import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/util/cn";

export const List = ({ className, ...rest }: ComponentPropsWithoutRef<"nav">) => (
  <nav
    className={cn("flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700", className)}
    {...rest}
  />
);

interface ListItemProps extends Omit<ComponentPropsWithoutRef<"button">, "disabled"> {
  disabled?: boolean;
}

export const ListItem = ({ className, disabled, ...rest }: ListItemProps) => (
  <button
    type="button"
    disabled={disabled}
    className={cn(
      "flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all",
      // 背景與文字色必須成對：hover 時背景轉成淺色 blue-gray-50，
      // 文字也要跟著轉深，否則暗色模式下會變成淺色字配淺色底，幾乎看不見
      "hover:bg-blue-gray-50/80 hover:text-blue-gray-900",
      "focus:bg-blue-gray-50/80 focus:text-blue-gray-900",
      "active:bg-blue-gray-50/80 active:text-blue-gray-900",
      "disabled:pointer-events-none disabled:select-none disabled:opacity-50",
      "disabled:hover:bg-transparent disabled:hover:text-blue-gray-500",
      className,
    )}
    {...rest}
  />
);

export const ListItemPrefix = ({ className, ...rest }: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("mr-4 grid place-items-center", className)} {...rest} />
);

export const ListItemSuffix = ({ className, ...rest }: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("ml-auto grid place-items-center justify-self-end", className)} {...rest} />
);

export default List;
