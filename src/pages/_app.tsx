import '@/styles/globals.css'
import { ThemeProvider, useTheme } from 'next-themes';
import Layout from '@/components/Layout/Layout';
import type { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar";
import { config } from '@fortawesome/fontawesome-svg-core'
import TailwindToaster from '@/components/Toast/Toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const currentPath = router.asPath;

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsTransitioning(true);
    };

    const handleRouteChangeComplete = () => {
      setIsTransitioning(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        <Layout>
          <NextNProgress height={2} color="#17FFAC" options={{ easing: 'ease', speed: 500 }} />
          <TailwindToaster />
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  )
}

export default App;
