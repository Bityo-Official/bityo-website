import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    // 站台內容是繁體中文，原本標成 en 會影響搜尋引擎判斷語言與地區
    <Html lang="zh-Hant-TW">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#17FFAD" />
      </Head>
      <body className='h-full text-black bg-gray-100 dark:bg-transparent dark:text-white transition duration-300 ease-in-out'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
