import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import SEO from "@/config/SEO.json";
import useSWR from 'swr';
import SkeletonTable from '@/components/Skeleton/SkeletonTable';
import Seo from "@/components/Seo";

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
const fetcher = (url: string) => fetch(url).then(res => res.json());

const ApiDoc = () => {
  const { data: spec, error } = useSWR('/api/swagger', fetcher);

  if (error)
    return <div>Failed to load</div>;

  return (
    <>
      <Seo meta={SEO.APIDoc} />
      <div className='dark:bg-white/70 mx-5 rounded-xl'>
        {
          spec ?
            <SwaggerUI spec={spec} />
            :
            <SkeletonTable />
        }
      </div>
    </>
  );
};

export default ApiDoc;