import SEO from '@/config/SEO.json';
import Head from 'next/head';
const PageNotFound = () => {
  return (
    <>
      <Head>
        <title>{SEO.NotFound.title}</title>
        <meta name="description" content={SEO.NotFound.description} />
        <meta property="og:title" content={SEO.NotFound.title} />
        <meta property="og:description" content={SEO.NotFound.description} />
        <meta property="og:image" content={SEO.NotFound.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.NotFound.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.NotFound.title} />
        <meta name="twitter:description" content={SEO.NotFound.description} />
        <meta name="twitter:image" content={SEO.NotFound.image} />
      </Head>
      <div className="flex items-center justify-center w-full h-96 m-auto">
        <div className="text-center">
          <p className="text-5xl">404</p>
          <p className="">Page Not Found</p>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;