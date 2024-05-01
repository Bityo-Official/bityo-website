import { DescriptionProps, FooterProps, IntroCardProps } from "@/types/Card/IntroCard";
import Image from "next/image";

const IntroCard = (props: IntroCardProps) => {
  return (
    <>
      <div className="w-full">
        <div className="group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-txt-dark dark:hover:shadow-gray-dark">
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
              className="mx-auto max-w-ful drop-shadow-three dark:drop-shadow-none lg:mr-0"
            />
          </a>
          <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
            <h3>
              <a
                className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
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
      { props.children }
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
              <div
                key={index}
                className={`flex items-center pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5 ${index !== props.data.length-1? 'border-r border-text-body border-opacity-10 mr-5' : ''}`}>
                <a className="inline-block mr-4 text-black hover:text-primary dark:text-white dark:hover:text-primary" href={ item.link }>
                  <h4 className="mb-1 text-base font-medium">{item.title}</h4>
                  <p className="text-sm text-body">
                    {item.description}
                  </p>
                </a>
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