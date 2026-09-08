import { FooterProps, HeaderProps, InformationProps, ProfileCardProps, SocialProps } from "@/types/Card/ProfileCard";
import Tooltip from "@/components/ui/Tooltip";
import Image from "next/image";

const ProfileCard = (props: ProfileCardProps) => {
  return (
    <div className="w-72 h-full dark:bg-primary-black-200 rounded-xl transform transition-transform duration-300 hover:scale-105">
      {props.children}
    </div>
  );
}

const Header = (props: HeaderProps) => {
  return (
    <div className="p-4 items-center">
      <Image
        src={props.img}
        alt="about-image"
        width={500}
        height={500}
        sizes="100%"
        className="rounded-xl mx-auto drop-shadow-three dark:drop-shadow-none"
      />
    </div>
  )
}

const Information = (props: InformationProps) => {
  return (
    <div className="text-center">
      {/* 姓名 */}
      <p className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900 dark:text-gray-300 mb-2">
        {props.name}
      </p>
      {/* 職位 */}
      <p className="block antialiased font-sans text-base leading-relaxed bg-clip-text text-transparent bg-linear-to-tr from-blue-gray-600 to-blue-gray-400 dark:from-blue-gray-300 dark:to-blue-gray-200 font-medium">
        {props.position}
      </p>
    </div>
  )
}

const Footer = (props: FooterProps) => {
  return (
    <div className="flex justify-center gap-7 py-6 items-center" >
      {props.children}
    </div>
  )
}

// 連結內只有一張圖，若圖沒有 alt 就等於沒有可存取名稱，
// 這裡用網域當作標籤（網址格式不正確時退回原字串）
const socialLabel = (link: string) => {
  try {
    return new URL(link).hostname.replace(/^www\./, '');
  } catch {
    return link;
  }
};

const Socials = (props: SocialProps) => {
  return (
    <div className={props.link ? '' : 'hidden'}>
      <Tooltip content={props.link}>
        <a
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={props.icon}
            alt={socialLabel(props.link)}
            width={20}
            height={20}
            className={props.className}
          />
        </a>
      </Tooltip>
    </div>
  )
}

ProfileCard.Header = Header;
ProfileCard.Information = Information;
ProfileCard.Footer = Footer;
ProfileCard.Socials = Socials;

export default ProfileCard;
