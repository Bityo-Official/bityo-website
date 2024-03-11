import { useRouter } from 'next/router';
import React from 'react';
import TradingView from "@/components/TradingView/TradingView";
import Head from 'next/head';
import { useTheme } from 'next-themes';

const SymbolPage = () => {
  const router = useRouter();
  const { exchange, symbol } = router.query;
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Head>
        <title>{symbol}｜Bityo</title>
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