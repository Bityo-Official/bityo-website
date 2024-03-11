import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="一個致力於研究區塊鏈和程式設計的台灣團隊，發展區塊鏈教育。" />
        <meta name="keywords" content="Bityo,幣友,Crypto,加密,CryptoCurrency,加密貨幣,BTC,Bitcoin,比特幣,ETH,Ethereum,以太坊" />
        <meta name="author" content="TershiXia" />
        <meta name="copyright" content="Bityo" />
        <meta httpEquiv="Content-Language" content="zh-TW" />

        <meta property="og:title" content="幣友 Bityo 官方網站" />
        <meta property="og:image:alt" content="一個致力於研究區塊鏈和程式設計的台灣團隊，發展區塊鏈教育。" />
        <meta property="og:site_name" content="幣友 Bityo" />
        <meta property="og:url" content="https://bityo.tw" />
        <meta property="og:description" content="一個致力於研究區塊鏈和程式設計的台灣團隊，發展區塊鏈教育。" />
        <meta name="hostname" content="bityo.tw" />
        <meta property="og:image" content="https://bityo.tw/imgs/bityo_bg_circle.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      </Head>
      <body className='h-full text-black bg-gray-100 dark:bg-transparent dark:text-white transition duration-300 ease-in-out'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
