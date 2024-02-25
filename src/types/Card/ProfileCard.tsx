import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ProfileCardProps {
  img: string;
  uid: string;
  name: string;
  position: string;
  description: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    tiktok?: string;
    globe?: string;
    telegram?: string;
  };
}