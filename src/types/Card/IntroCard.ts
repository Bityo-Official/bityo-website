export interface IntroCardProps {
  title: string;
  img: string;
  type?: {
    name: string;
    bgColor: string;
  };
  link: string;
  children: React.ReactNode;
}

export interface DescriptionProps {
  children: React.ReactNode;
}

export interface FooterProps {
  data: {
    title: string | number;
    tooltip?: string;
    description: string | number;
    link?: string;
  }[];
}