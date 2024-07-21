import Intro from "@/components/About/Intro";
import Member from "@/components/About/Member";
import Head from "next/head";
import SEO from "@/config/SEO.json";

const about = () => {
  return (
    <>
      <Head>
        <title>{SEO.About.title}</title>
        <meta name="description" content={SEO.About.description} />
        <meta property="og:title" content={SEO.About.title} />
        <meta property="og:description" content={SEO.About.description} />
        <meta property="og:image" content={SEO.About.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.About.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.About.title} />
        <meta name="twitter:description" content={SEO.About.description} />
        <meta name="twitter:image" content={SEO.About.image} />
      </Head>
      <Intro></Intro>
      <Member></Member>
    </>
  );
};

export default about;
