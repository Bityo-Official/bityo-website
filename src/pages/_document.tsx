import { Html, Head, Main, NextScript } from 'next/document';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

export default function Document() {
  
  return (
    <Html lang="en">
      <Head></Head>
      <body className='text-black bg-white dark:bg-gray-900 dark:text-white'>
        <Navbar></Navbar>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
