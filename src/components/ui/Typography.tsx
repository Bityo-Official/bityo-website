import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type TypographyVariant =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "lead" | "paragraph" | "small";

/** 沿用 @material-tailwind/react Typography 的字級，維持既有外觀 */
const VARIANT_CLASSES: Record<TypographyVariant, string> = {
  h1: "text-5xl font-semibold leading-tight tracking-normal",
  h2: "text-4xl font-semibold leading-[1.3] tracking-normal",
  h3: "text-3xl font-semibold leading-snug tracking-normal",
  h4: "text-2xl font-semibold leading-snug tracking-normal",
  h5: "text-xl font-semibold leading-snug tracking-normal",
  h6: "text-base font-semibold leading-relaxed tracking-normal",
  lead: "text-xl font-normal leading-relaxed",
  paragraph: "text-base font-light leading-relaxed",
  small: "text-sm font-light leading-normal",
};

const DEFAULT_TAG: Record<TypographyVariant, ElementType> = {
  h1: "h1", h2: "h2", h3: "h3", h4: "h4", h5: "h5", h6: "h6",
  lead: "p", paragraph: "p", small: "p",
};

const COLOR_CLASSES: Record<string, string> = {
  gray: "text-gray-700",
  white: "text-white",
  black: "text-black",
  inherit: "",
};

type TypographyProps<T extends ElementType> = {
  variant?: TypographyVariant;
  color?: keyof typeof COLOR_CLASSES;
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "color" | "className" | "children">;

const Typography = <T extends ElementType = "p">({
  variant = "paragraph",
  color,
  as,
  className = "",
  children,
  ...rest
}: TypographyProps<T>) => {
  const Tag = (as ?? DEFAULT_TAG[variant]) as ElementType;
  const colorClass = color ? COLOR_CLASSES[color] ?? "" : "text-blue-gray-900";

  return (
    <Tag className={`font-sans antialiased ${VARIANT_CLASSES[variant]} ${colorClass} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Typography;
