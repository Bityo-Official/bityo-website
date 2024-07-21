import React from 'react';
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHandshake, faUserTie } from '@fortawesome/free-solid-svg-icons';
import SEO from "@/config/SEO.json";

interface Feature {
  icon: JSX.Element;
  title: string;
  email: string;
}

const features: Feature[] = [
  {
    icon: (
      <FontAwesomeIcon className="w-10 h-10" icon={faHandshake} />
    ),
    title: '商務合作',
    email:
      'bd@bityo.tw',
  },
  {
    icon: (
      <FontAwesomeIcon className="w-10 h-10" icon={faEnvelope} />
    ),
    title: '其他服務',
    email:
      'service@bityo.tw',
  },
  {
    icon: (
      <FontAwesomeIcon className="w-10 h-10" icon={faUserTie} />
    ),
    title: 'CEO',
    email:
      'ceo@bityo.tw',
  }
];

const Contact = () => {
  return (
    <>
      <Head>
        <title>{SEO.Contact.title}</title>
        <meta name="description" content={SEO.Contact.description} />
        <meta property="og:title" content={SEO.Contact.title} />
        <meta property="og:description" content={SEO.Contact.description} />
        <meta property="og:image" content={SEO.Contact.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.Contact.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.Contact.title} />
        <meta name="twitter:description" content={SEO.Contact.description} />
        <meta name="twitter:image" content={SEO.Contact.image} />
      </Head>
      <section className="p-5 sm:pt-10 sm:px-10 sm:pb-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {features.map((feature, index) => (
            <div key={index} className="">
              <div className="wow fadeInUp" data-wow-delay=".15s">
                <div className='w-full flex justify-center'>
                  <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="mb-5 text-xl font-bold text-black text-center dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  {feature.title}
                </h3>
                <a href={`mailto:${feature.email}`} className="text-base font-medium leading-relaxed text-body-color text-center hover:text-primary">
                  {feature.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Contact;
