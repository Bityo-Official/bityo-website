import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ProfileCardProps {
  children: React.ReactNode;
  uid: string;
}

export interface HeaderProps {
  img: string;
}

export interface InfomartionProps {
  name: string;
  position: string;
}

export interface FooterProps {
  children: React.ReactNode;
}

export interface SocialsProps {
  facebook?: string | undefined;
  twitter?: string | undefined;
  instagram?: string | undefined;
  tiktok?: string | undefined;
  globe?: string | undefined;
}

export interface SocialProps {
  link: string;
  icon: string;
  color?: string;
  className?: string;
}