import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/util/cn";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

const SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: "w-6 h-6",
  sm: "w-9 h-9",
  md: "w-10 h-10",
  lg: "w-[58px] h-[58px]",
  xl: "w-[74px] h-[74px]",
  xxl: "w-[110px] h-[110px]",
};

interface AvatarProps extends Omit<ComponentPropsWithoutRef<"img">, "size"> {
  size?: AvatarSize;
  withBorder?: boolean;
  alt: string;
}

/**
 * 取代 @material-tailwind/react 的 Avatar。
 * 刻意維持原本的 <img>：頭像來源是 CoinGecko 等任意遠端 host，
 * 改用 next/image 會被 next.config 的 remotePatterns 白名單擋掉。
 */
const Avatar = ({ size = "md", withBorder = false, className, alt, ...rest }: AvatarProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    alt={alt}
    className={cn(
      "inline-block rounded-full object-cover object-center",
      SIZE_CLASSES[size],
      withBorder && "border-2",
      className,
    )}
    {...rest}
  />
);

export default Avatar;
