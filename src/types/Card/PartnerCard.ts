export interface PartnerCardProps {
  position: string;
  department: string;
  packageName: string;
  description: string;
  link: {
    text: string;
    href: string;
  };
  children: React.ReactNode;
}