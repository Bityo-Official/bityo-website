import { StaticImageData } from "next/image";

export interface IconProps {
  className?: string;
  icon_light: string | StaticImageData;
  icon_dark?: string | StaticImageData;
}
