import { ProfileCardProps } from "@/types/Card/ProfileCard";
import { faFacebook, faInstagram, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
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

const ProfileCard = (props: ProfileCardProps) => {
  return (
    <Card className="w-72" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
      <CardHeader floated={false} className="h-60" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        <Image
          src={props.img}
          alt="about-image"
          fill
          className="mx-auto max-w-full drop-shadow-three dark:drop-shadow-none lg:mr-0"
        />
      </CardHeader>
      <CardBody className="text-center" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        <Typography variant="h4" color="blue-gray" className="mb-2" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
          {props.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
          {props.position}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        {/* facebook */}
        <div className={props.socials?.facebook ? '' : 'hidden'}>
          <Tooltip content={props.socials?.facebook}>
            <Typography
              as="a"
              href={props.socials?.facebook}
              variant="lead"
              target="_blank"
              color="blue"
              className="flex items-center"
              textGradient nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              <FontAwesomeIcon icon={faFacebook} className={`w-5 text-[#1F8EF4]`} />
            </Typography>
          </Tooltip>
        </div>

        {/* twitter */}
        <div className={props.socials?.twitter ? '' : 'hidden'}>
          <Tooltip content={props.socials?.twitter}>
            <Typography
              as="a"
              href={props.socials?.twitter}
              variant="lead"
              target="_blank"
              color="blue"
              className="flex items-center"
              textGradient nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              <FontAwesomeIcon icon={faTwitter} className={`w-5 text-[#D92F7E]`} />
            </Typography>
          </Tooltip>
        </div>

        {/* YouTube */}
        <div className={props.socials?.youtube ? '' : 'hidden'}>
          <Tooltip content={props.socials?.youtube}>
            <Typography
              as="a"
              href={props.socials?.youtube}
              variant="lead"
              target="_blank"
              color="blue"
              className="flex items-center"
              textGradient nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              <FontAwesomeIcon icon={faYoutube} className={`w-5 text-[#FF0000]`} />
            </Typography>
          </Tooltip>
        </div>

        {/* instagram */}
        <div className={props.socials?.instagram ? '' : 'hidden'}>
          <Tooltip content={props.socials?.instagram}>
            <Typography
              as="a"
              href={props.socials?.instagram}
              variant="lead"
              target="_blank"
              color="blue"
              className="flex items-center"
              textGradient nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              <FontAwesomeIcon icon={faInstagram} className={`w-5 text-black`} />
            </Typography>
          </Tooltip>
        </div>

        {/* tiktok */}
        <div className={props.socials?.tiktok ? '' : 'hidden'}>
          <Tooltip content={props.socials?.tiktok}>
            <Typography
              as="a"
              href={props.socials?.tiktok}
              variant="lead"
              target="_blank"
              color="blue"
              className="flex items-center"
              textGradient nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              <FontAwesomeIcon icon={faTiktok} className={`w-5 text-black`} />
            </Typography>
          </Tooltip>
        </div>

        {/* globe */}
        <div className={props.socials?.globe ? '' : 'hidden'}>
          <Tooltip content={props.socials?.globe}>
            <Typography
              as="a"
              href={props.socials?.globe}
              variant="lead"
              target="_blank"
              color="blue"
              className="flex items-center"
              textGradient nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              <FontAwesomeIcon icon={faGlobe} className={`w-5 text-[#27A5E4]`} />
            </Typography>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProfileCard;