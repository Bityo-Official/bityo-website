import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import 'swagger-ui-react/swagger-ui.css';
import SEO from "@/config/SEO.json";
import useSWR from 'swr';
import SkeletionTable from '@/components/Skeletion/SkeletionTable';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
const fetcher = (url: string) => fetch(url).then(res => res.json());

const ApiDoc = () => {
  const { data: spec, error } = useSWR('/api/swagger', fetcher);

  if (error)
    return <div>Failed to load</div>;

  return (
    <>
      <Head>
        <title>{SEO.APIDoc.title}</title>
        <meta name="description" content={SEO.APIDoc.description} />
        <meta property="og:title" content={SEO.APIDoc.title} />
        <meta property="og:description" content={SEO.APIDoc.description} />
        <meta property="og:image" content={SEO.APIDoc.image} />
        <meta property="og:type" content={SEO.APIDoc.type} />
        <meta name="twitter:title" content={SEO.APIDoc.title} />
        <meta name="twitter:description" content={SEO.APIDoc.description} />
        <meta name="twitter:image" content={SEO.APIDoc.image} />
      </Head>
      <div className='dark:bg-white/70 mx-5 rounded-xl'>
        {
          spec ?
            <SwaggerUI spec={spec} />
            :
            <SkeletionTable />
        }
      </div>
    </>
  );
};

export default ApiDoc;
