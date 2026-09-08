import SEO from '@/config/SEO.json';
import Seo from "@/components/Seo";
const PageNotFound = () => {
  return (
    <>
      <Seo meta={SEO.NotFound} noindex />
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