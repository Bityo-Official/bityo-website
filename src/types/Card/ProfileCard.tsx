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

export interface SocialProps {
  link: string;
  icon: string;
  color: string;
}