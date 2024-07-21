import H2 from "@/components/Title/H2";
import Head from "next/head";
import SEO from "@/config/SEO.json";

const community = () => {
  return (
    <>
      <Head>
        <title>{SEO.Community.title}</title>
        <meta name="description" content={SEO.Community.description} />
        <meta property="og:title" content={SEO.Community.title} />
        <meta property="og:description" content={SEO.Community.description} />
        <meta property="og:image" content={SEO.Community.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.Community.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.Community.title} />
        <meta name="twitter:description" content={SEO.Community.description} />
        <meta name="twitter:image" content={SEO.Community.image} />
      </Head>
      <section className="p-5 sm:p-20">
        <H2 className="text-center" title="我們歡迎您的加入" />
        <p className="text-base text-center text-body dark:text-body-dark">我們擁有豐富的社群資源，包含交易及區塊鏈技術。</p>
      </section>
    </>
  );
}

export default community;