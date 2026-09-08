import MarketTable from "@/components/Table/MarketTable";
import SEO from "@/config/SEO.json";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { MarketsProps } from "@/types/Market/Market";
import { CryptoProps } from "@/types/Market/Market";
import type { TickerSnapshot } from "@/pages/api/getBinanceTickers";
import SkeletonTable from "@/components/Skeleton/SkeletonTable";
import Seo from "@/components/Seo";

// data-stream.binance.vision 是 Binance 的公開市場資料端點，不需金鑰
const WS_URL = 'wss://data-stream.binance.vision/ws/!miniTicker@arr';

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
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let retries = 0;

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
    const connect = () => {
      if (cancelled) return;

      ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        retries = 0;
      };

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

      // onerror 之後一定會接著觸發 onclose，所以重連只在 onclose 處理；
      // 也不在這裡印錯誤：React StrictMode 會在開發模式下重跑 effect，
      // cleanup 在連線尚未建立時 close()，本來就會噴一次 error。
      ws.onclose = () => {
        if (cancelled) return;

        // Binance 約每 24 小時會主動斷線，正式環境需要自動重連
        const delay = Math.min(1000 * 2 ** retries, 30_000);
        retries += 1;
        reconnectTimer = setTimeout(connect, delay);
      };
    };

    connect();

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
      clearTimeout(reconnectTimer);
      clearInterval(interval);
      ws?.close();
    };
  }, [toCrypto]);

  return (
    <>
      <Seo meta={SEO.Market} />
      <div className="mx-5 my-2">
        {
          cryptos.length > 0 ?
            <MarketTable
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
            <SkeletonTable />
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
