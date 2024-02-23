import { useRouter } from 'next/router';
import React from 'react';
import TradingView from "@/components/TradingView/TradingView";
import Head from 'next/head';

const SymbolPage = () => {
  const router = useRouter();
  const { symbol } = router.query;

  return (
    <>
      <Head>
        <title>{symbol}｜Bityo</title>
      </Head>
      {
        typeof symbol === 'string' ? (
          <TradingView
            symbol={`PIONEX:${symbol}.P`}
            timezone={'Asia/Taipei'}
            locale={'zh_TW'}
            theme={'dark'}
          />
        ) : (
          <></>
        )
      }

    </>
  )
};

export default SymbolPage;