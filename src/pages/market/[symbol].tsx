import { useRouter } from 'next/router';
import React from 'react';
import TradingView from "@/components/TradingView/TradingView";

const SymbolPage = () => {
  const router = useRouter();
  const { symbol } = router.query;

  return (
    <>
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