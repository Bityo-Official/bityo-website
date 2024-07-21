import { useRouter } from 'next/router';
import React from 'react';
import TradingView from "@/components/TradingView/TradingView";
import Head from 'next/head';
import { useTheme } from 'next-themes';
import SEO from "@/config/SEO.json";

const SymbolPage = () => {
  const router = useRouter();
  const { exchange, symbol } = router.query;
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Head>
        <title>{symbol}｜Bityo</title>
        <meta name="description" content={`實時取得 ${symbol} 交易對的行情。`} />
        <meta property="og:title" content={`${symbol}｜Bityo`} />
        <meta property="og:description" content={`實時取得 ${symbol} 交易對的行情。`} />
        <meta property="og:image" content={SEO.default.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.default.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={`${symbol}｜Bityo`} />
        <meta name="twitter:description" content={`實時取得 ${symbol} 交易對的行情。`} />
        <meta name="twitter:image" content={SEO.default.image} />
      </Head>
      {
        typeof symbol === 'string' ? (
          <TradingView
            symbol={`${exchange}:${symbol}.P`}
            timezone={'Asia/Taipei'}
            locale={'zh_TW'}
            theme={theme ==='light'? 'light': 'dark'}
          />
        ) : (
          <></>
        )
      }

    </>
  )
};

export default SymbolPage;