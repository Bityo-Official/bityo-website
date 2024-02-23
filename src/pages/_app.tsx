import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout/Layout';
import type { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar";
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <NextNProgress height={2} color="#17FFAC" options={{ easing: 'ease', speed: 500 }} />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App;
