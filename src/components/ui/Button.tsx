import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "filled" | "outlined" | "text" | "gradient";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  filled: "bg-gray-900 text-white shadow-md hover:shadow-lg",
  gradient: "bg-linear-to-tr from-gray-900 to-gray-800 text-white shadow-md hover:shadow-lg",
  outlined: "border border-current bg-transparent",
  text: "bg-transparent hover:bg-current/10",
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

export const Button = ({
  variant = "filled",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    className={`${BASE} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
    {...rest}
  />
);

const ICON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export const IconButton = ({
  variant = "filled",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    className={`${BASE} ${VARIANT_CLASSES[variant]} ${ICON_SIZE_CLASSES[size]} p-0 ${className}`}
    {...rest}
  />
);

export default Button;
