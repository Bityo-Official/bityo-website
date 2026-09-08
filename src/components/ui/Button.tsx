import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/util/cn";

type ButtonVariant = "filled" | "outlined" | "text" | "gradient";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  filled: "bg-gray-900 text-white shadow-md hover:shadow-lg",
  gradient: "bg-linear-to-tr from-gray-900 to-gray-800 text-white shadow-md hover:shadow-lg",
  outlined: "border border-current bg-transparent",
  // 沿用原本 @material-tailwind 的 text 樣式。
  // 這裡的 text-gray-900 不能省：Navbar 的漢堡圖示靠 `dark:invert` 反轉成白色，
  // 若顏色改為繼承 body（暗色模式是白），反轉後會變成黑色。
  // 暗色模式下 gray-900/10 是深色疊深色，等於看不見，所以改用亮色疊層讓 hover 有回饋
  text: "bg-transparent text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 dark:hover:bg-white/10 dark:active:bg-white/20",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-xs",
  lg: "px-7 py-3.5 text-sm",
};

const BASE =
  "inline-flex select-none items-center justify-center rounded-lg text-center align-middle font-sans font-bold uppercase " +
  "transition-all disabled:pointer-events-none disabled:opacity-50 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({ variant = "filled", size = "md", className, type = "button", ...rest }: ButtonProps) => (
  <button
    type={type}
    className={cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}
    {...rest}
  />
);

const ICON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 w-8 max-h-[32px] max-w-[32px] text-xs",
  md: "h-10 w-10 max-h-[40px] max-w-[40px] text-xs",
  lg: "h-12 w-12 max-h-[48px] max-w-[48px] text-sm",
};

export const IconButton = ({ variant = "filled", size = "md", className, type = "button", ...rest }: ButtonProps) => (
  <button
    type={type}
    className={cn(BASE, VARIANT_CLASSES[variant], ICON_SIZE_CLASSES[size], "p-0", className)}
    {...rest}
  />
);

export default Button;
