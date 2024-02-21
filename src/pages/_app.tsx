import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout/Layout';
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App;
