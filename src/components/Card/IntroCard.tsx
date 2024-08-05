import { DescriptionProps, FooterProps, IntroCardProps } from "@/types/Card/IntroCard";
import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";

const IntroCard = (props: IntroCardProps) => {
  return (
    <>
      <div className="w-full">
      <div className="h-full group relative overflow-hidden rounded-lg bg-txt-dark/10 shadow-one duration-300 hover:shadow-two dark:hover:shadow-two hover:shadow-txt-dark dark:bg-txt-dark dark:hover:shadow-txt-dark transform transition-transform` hover:scale-105">
          <a className="relative block aspect-[37/22] w-full" href={props.link} target="_blank">
            {
              props.type?.name !== undefined ? (

                <span className={`absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full ${props.type?.bgColor} px-4 py-2 text-sm font-semibold capitalize text-white`}>
                  {props.type?.name}
                </span>
              ) : (
                <></>
              )
            }
            <Image
              src={props.img}
              alt="about-image"
              priority
              fill
              sizes="100%"
              className="mx-auto max-h-full drop-shadow-three dark:drop-shadow-none lg:mr-0"
            />
          </a>
          <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
            <h3>
              <a
                className="mb-4 block text-xl font-bold text-black hover:text-web-green dark:text-white dark:hover:text-web-green sm:text-2xl"
                href={props.link}>
                {props.title}
              </a>
            </h3>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}

const Description = (props: DescriptionProps) => {
  return (
    <div className="pb-6 text-base font-medium text-body">
      {props.children}
    </div>
  );
}

const Footer = (props: FooterProps) => {
  return (
    <div className="pt-6 border-t border-text-body border-opacity-10 dark:border-white dark:border-opacity-10">
      <div className="flex items-center">
        {
          props.data.map((item, index) => {
            return (
              // 如果是最後一個就不要加右邊框
              <div
                key={index}
                className={`flex items-center dark:border-white dark:border-opacity-10 ${index !== props.data.length - 1 ? 'border-r border-text-body border-opacity-10' : ''}`}>
                <Tooltip content={
                  <>
                    <p>{item.tooltip}</p>
                    <p>網址：{ item.link }</p>
                  </>
                }>
                  {/* 如果是最後一個就不要 margin right */}
                  {/* 如果是第一個就不要 margin left */}
                  <a className={`inline-block text-black hover:text-web-green dark:text-white dark:hover:text-web-green ${index !== props.data.length - 1 ? 'mr-2' : ''} ${index === 1 ? 'ml-2' : ''}`} href={item.link}>
                    <h4 className="mb-1 text-base font-medium">{item.title}</h4>
                    <p className="text-sm text-body">
                      {item.description}
                    </p>
                  </a>
                </Tooltip>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

IntroCard.Description = Description;
IntroCard.Footer = Footer;

export default IntroCard;