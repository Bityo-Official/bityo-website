import { FooterProps, HeaderProps, InfomartionProps, ProfileCardProps, SocialProps } from "@/types/Card/ProfileCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import Image from "next/image";

const fabIcons = require("@fortawesome/free-brands-svg-icons");
const fasIcons = require("@fortawesome/free-solid-svg-icons");

const ProfileCard = (props: ProfileCardProps) => {
  return (
    <Card className="w-72" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
      {props.children}
    </Card>
  );
}

const Header = (props: HeaderProps) => {
  return (
    <CardHeader floated={false} className="h-60" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
      <Image
        src={props.img}
        alt="about-image"
        fill
        className="mx-auto max-w-full drop-shadow-three dark:drop-shadow-none lg:mr-0"
      />
    </CardHeader>
  )
}

const Infomartion = (props: InfomartionProps) => {
  return (
    <CardBody className="text-center" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
      <Typography variant="h4" color="blue-gray" className="mb-2" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        {props.name}
      </Typography>
      <Typography color="blue-gray" className="font-medium" textGradient nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        {props.position}
      </Typography>
    </CardBody>
  )
}

const Footer = (props: FooterProps) => {
  return (
    <CardFooter className="flex justify-center gap-7 pt-2 items-center" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
      {props.children}
    </CardFooter>
  )
}

const Socials = (props: SocialProps) => {
  return (
    <div className={props.link ? '' : 'hidden'}>
      <Tooltip content={props.link}>
        <Typography
          as="a"
          href={props.link}
          variant="lead"
          target="_blank"
          color="blue"
          className="flex items-center"
          textGradient nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
          <FontAwesomeIcon icon={fasIcons[props.icon] || fabIcons[props.icon]} className={`w-5 ${props.color}`} />
        </Typography>
      </Tooltip>
    </div>
  )
}

ProfileCard.Header = Header;
ProfileCard.Infomartion = Infomartion;
ProfileCard.Footer = Footer;
ProfileCard.Socials = Socials;

export default ProfileCard;