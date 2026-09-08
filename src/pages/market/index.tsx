import MarketTable from "@/components/Table/MarketTable";
import SEO from "@/config/SEO.json";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { MarketsProps } from "@/types/Market/Merket";
import { CryptoProps } from "@/types/Market/Merket";
import type { TickerSnapshot } from "@/pages/api/getBinanceTickers";
import SkeletionTable from "@/components/Skeletion/SkeletionTable";
import Seo from "@/components/Seo";

// Binance !miniTicker@arr 的單筆格式
interface MiniTicker {
  s: string; // symbol
  c: string; // 收盤價（現價）
  o: string; // 24 小時前開盤價
  h: string; // 24 小時最高
  l: string; // 24 小時最低
  v: string; // 成交量
}

const Markets = ({ coinInfo }: MarketsProps) => {
  const [cryptos, setCryptos] = useState<CryptoProps[]>([]);
  // 累積各交易對的最新報價；WebSocket 是增量推送，必須用 Map 合併而非整包取代
  const tickers = useRef<Map<string, TickerSnapshot>>(new Map());
  const dirty = useRef(false);
  const [selectedTab, setSelectedTab] = useState({
    label: "Pionex",
    value: "pionex",
    disabled: false
  });

  // CoinGecko 的幣種資料查表（市值、排名、圖片等）
  const coinMap = useMemo(() => {
    const m = new Map<string, CryptoProps>();
    coinInfo.forEach((c) => m.set(c.symbol.toLowerCase(), c));
    return m;
  }, [coinInfo]);

  const toCrypto = useCallback((t: TickerSnapshot): CryptoProps => {
    const base = t.symbol.replace(/USDT$/, '').toLowerCase();
    const info = coinMap.get(base);

    return {
      symbol: t.symbol,
      name: base,
      image: info?.image ?? '',
      current_price: t.price,
      total_volume: t.volume,
      high_24h: t.high,
      low_24h: t.low,
      price_change_percentage_24h: t.changePercent,
      full_name: info ? info.name.replace(' ', '-') : '',
      market_cap: info?.market_cap ?? 0,
      market_cap_rank: info?.market_cap_rank ?? 0,
      circulating_supply: info?.circulating_supply ?? 0,
      total_supply: info?.total_supply ?? 0,
      max_supply: info?.max_supply ?? 0,
      ath: info?.ath ?? 0,
      ath_change_percentage: info?.ath_change_percentage ?? 0,
    };
  }, [coinMap]);

  useEffect(() => {
    let cancelled = false;

    // 1) 先用 REST 快照把表格填滿，不必等 WebSocket 第一次推送
    (async () => {
      try {
        const res = await fetch('/api/getBinanceTickers');
        if (!res.ok || cancelled) return;
        const snapshot: TickerSnapshot[] = await res.json();
        if (cancelled) return;
        snapshot.forEach((t) => tickers.current.set(t.symbol, t));
        dirty.current = true;
      } catch (error) {
        console.error('Failed to load ticker snapshot:', error);
      }
    })();

    // 2) 再用 WebSocket 做增量更新
    //    原本的 !ticker@arr 已經不會推送資料（連得上但收不到），
    //    改用 !miniTicker@arr，payload 也從約 1.9MB 降到約 13KB
    const ws = new WebSocket('wss://data-stream.binance.vision/ws/!miniTicker@arr');

    ws.onmessage = (event) => {
      let updates: MiniTicker[];
      try {
        updates = JSON.parse(event.data);
      } catch {
        return;
      }
      if (!Array.isArray(updates)) return;

      for (const u of updates) {
        if (!u.s?.endsWith('USDT')) continue;
        const open = parseFloat(u.o);
        const close = parseFloat(u.c);
        tickers.current.set(u.s, {
          symbol: u.s,
          price: close,
          high: parseFloat(u.h),
          low: parseFloat(u.l),
          volume: parseFloat(u.v),
          // miniTicker 沒有漲跌幅欄位，用開盤/現價換算
          changePercent: open > 0 ? ((close - open) / open) * 100 : 0,
        });
      }
      dirty.current = true;
    };

    ws.onerror = () => console.error('Binance WebSocket error');

    // 3) 每秒才更新一次畫面（原本是 100ms，等於每秒重繪整張表 10 次）
    const interval = setInterval(() => {
      if (!dirty.current) return;
      dirty.current = false;
      const rows = [...tickers.current.values()].map(toCrypto);
      rows.sort((a, b) => b.market_cap - a.market_cap);
      setCryptos(rows);
    }, 1000);

    return () => {
      cancelled = true;
      ws.close();
      clearInterval(interval);
    };
  }, [toCrypto]);

  return (
    <>
      <Seo meta={SEO.Market} />
      <div className="mx-5 my-2">
        {
          cryptos.length > 0 ?
            <MarketTable
              head={['#','幣種', '交易所', '價格', '24h%', '24h成交量', '24h最高', '24h最低']}
              rows={cryptos.length > 0 ? cryptos.map(crypto => ({
                name: crypto.name,
                image: crypto.image,
                current_price: crypto.current_price,
                price_change_percentage_24h: crypto.price_change_percentage_24h,
                total_volume: crypto.total_volume,
                high_24h: crypto.high_24h,
                low_24h: crypto.low_24h,
              })) : []}
              data={cryptos}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              tab={[
                {
                  label: "Pionex",
                  value: "pionex",
                  disabled: false,
                },
                {
                  label: "Binance",
                  value: "binance",
                  disabled: false,
                },
                {
                  label: "OKX",
                  value: "okx",
                  disabled: false,
                },
                {
                  label: "BingX",
                  value: "bingx",
                  disabled: false,
                },
                {
                  label: "Bitget",
                  value: "bitget",
                  disabled: false,
                },
                {
                  label: "Bitunix",
                  value: "bitunix",
                  disabled: true,
                },
              ]}
            />
            :
            <SkeletionTable />
        }
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const baseUrl = req.headers.host?.startsWith('localhost')
      ? `http://${req.headers.host}`
      : `https://${req.headers.host}`;

    const response = await axios.get(`${baseUrl}/api/getCryptos`);
    const coinInfo = response.data;

    return {
      props: {
        coinInfo,
      },
    };
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return {
      props: {
        coinInfo: [],
      },
    };
  }
};

export default Markets;
