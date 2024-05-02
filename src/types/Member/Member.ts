export interface MemberDataProps {
  img: string;
  name: string;
  uid: string;
  position: string;
  description: string;
  socials: {
    link: string;
    icon: string;
    color: string;
  }[];
}