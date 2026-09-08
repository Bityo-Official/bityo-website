import { useRouter } from 'next/router';
import React from 'react';
import TradingView from "@/components/TradingView/TradingView";
import { useTheme } from 'next-themes';
import SEO from "@/config/SEO.json";
import Seo from "@/components/Seo";

const SymbolPage = () => {
  const router = useRouter();
  const { exchange, symbol } = router.query;
  const { theme, setTheme } = useTheme();

  // 確認 symbol 為字符串並處理
  const title = typeof symbol === 'string' ? `${symbol}｜Bityo` : 'Loading...';

  return (
    <>
      <Seo
        meta={{
          ...SEO.default,
          title,
          description: `實時取得 ${symbol} 交易對的行情。`,
        }}
      />
      {
        typeof symbol === 'string' ? (
          <TradingView
            symbol={`${exchange}:${symbol}.P`}
            timezone={'Asia/Taipei'}
            locale={'zh_TW'}
            theme={theme === 'light' ? 'light' : 'dark'}
          />
        ) : (
          <></>
        )
      }
    </>
  )
};

export default SymbolPage;
