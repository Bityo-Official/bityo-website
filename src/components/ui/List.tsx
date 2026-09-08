import type { ComponentPropsWithoutRef } from "react";

export const List = ({ className = "", ...rest }: ComponentPropsWithoutRef<"nav">) => (
  <nav className={`flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 ${className}`} {...rest} />
);

interface ListItemProps extends Omit<ComponentPropsWithoutRef<"button">, "disabled"> {
  disabled?: boolean;
}

export const ListItem = ({ className = "", disabled, ...rest }: ListItemProps) => (
  <button
    type="button"
    disabled={disabled}
    className={
      "flex w-full items-center rounded-lg p-3 text-start leading-tight outline-hidden transition-all " +
      "hover:bg-blue-gray-50/80 focus:bg-blue-gray-50/80 " +
      "disabled:pointer-events-none disabled:opacity-50 " +
      className
    }
    {...rest}
  />
);

export const ListItemPrefix = ({ className = "", ...rest }: ComponentPropsWithoutRef<"div">) => (
  <div className={`mr-4 grid place-items-center ${className}`} {...rest} />
);

export const ListItemSuffix = ({ className = "", ...rest }: ComponentPropsWithoutRef<"div">) => (
  <div className={`ml-auto grid place-items-center justify-self-end ${className}`} {...rest} />
);

export default List;
