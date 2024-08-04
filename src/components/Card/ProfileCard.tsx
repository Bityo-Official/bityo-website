import { FooterProps, HeaderProps, InfomartionProps, ProfileCardProps, SocialProps } from "@/types/Card/ProfileCard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";

// const fabIcons = require("@fortawesome/free-brands-svg-icons");
// const fasIcons = require("@fortawesome/free-solid-svg-icons");

const ProfileCard = (props: ProfileCardProps) => {
  return (
    <div className="w-72 h-full dark:bg-primary-black-200 rounded-xl">
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

const Infomartion = (props: InfomartionProps) => {
  return (
    <div className="text-center">
      {/* 姓名 */}
      <p className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900 dark:text-gray-300 mb-2">
        {props.name}
      </p>
      {/* 職位 */}
      <p className="block antialiased font-sans text-base leading-relaxed bg-clip-text text-transparent bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400 dark:from-blue-gray-300 dark:to-blue-gray-200 font-medium">
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

const Socials = (props: SocialProps) => {
  return (
    <div className={props.link ? '' : 'hidden'}>
      <Tooltip content={props.link}>
        <a
          href={props.link}>
          {/* <FontAwesomeIcon icon={fasIcons[props.icon] || fabIcons[props.icon]} className={`w-5 ${props.color}`} /> */}
          <Image
            src={props.icon}
            alt={""}
            width={20}
            className={props.className}
          />
        </a>
      </Tooltip>
    </div>
  )
}

ProfileCard.Header = Header;
ProfileCard.Infomartion = Infomartion;
ProfileCard.Footer = Footer;
ProfileCard.Socials = Socials;

export default ProfileCard;