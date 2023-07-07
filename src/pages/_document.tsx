import { Html, Head, Main, NextScript } from 'next/document';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="一個致力於研究區塊鏈和程式設計的台灣團隊，發展區塊鏈教育。" />
        <meta name="keywords" content="Bityo,幣友,Crypto,加密,CryptoCurrency,加密貨幣,BTC,Bitcoin,比特幣,ETH,Ethereum,乙太坊" />
        <meta name="author" content="TershiXia" />
        <meta name="copyright" content="Bityo" />
        <meta httpEquiv="Content-Language" content="zh-TW" />
        <meta property="og:title" content="Bityo 幣友官方網站" />
        <meta property="og:description" content="一個致力於研究區塊鏈和程式設計的台灣團隊，發展區塊鏈教育。" />
        <meta property="og:image" content="https://bityo.tw/imgs/bityo_bg_circle.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      </Head>
      <body className='text-black bg-white dark:bg-gray-900 dark:text-white transition-colors duration-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;