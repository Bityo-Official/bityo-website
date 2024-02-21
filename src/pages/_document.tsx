import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className='text-black bg-white dark:bg-[#1F2229] dark:text-white /*樣式變更動畫 transition-colors duration-100*/'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
