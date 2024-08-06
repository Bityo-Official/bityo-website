import Head from "next/head";
import MarketTable from "@/components/Table/MarketTable";
import SEO from "@/config/SEO.json";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { MarketsProps } from "@/types/Market/Merket";
import { CryptoProps } from "@/types/Market/Merket";
import SkeletionTable from "@/components/Skeletion/SkeletionTable";

const Markets = ({ coinInfo }: MarketsProps) => {
  const [cryptos, setCryptos] = useState<CryptoProps[]>([]);
  const tempData = useRef<CryptoProps[]>([]);

  useEffect(() => {
    // 初始化 WebSocket 連接
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    // 當收到消息時更新數據
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const updatedCryptos = data
        .filter((crypto: any) => crypto.s.endsWith('USDT')) // 過濾出只保留 USDT 交易對
        .map((crypto: any) => {
          const symbolWithoutUSDT = crypto.s.replace('USDT', '').toLowerCase();
          const matchingCoin = coinInfo.find(c => c.symbol.toLowerCase() === symbolWithoutUSDT);

          return {
            symbol: crypto.s,
            name: symbolWithoutUSDT,
            image: matchingCoin ? matchingCoin.image : '',
            current_price: parseFloat(crypto.c),
            total_volume: parseFloat(crypto.v),
            high_24h: parseFloat(crypto.h),
            low_24h: parseFloat(crypto.l),
            price_change_percentage_24h: parseFloat(crypto.P),
            full_name: matchingCoin ? matchingCoin.name.replace(' ', '-') : '', // 設置全名
            market_cap: matchingCoin ? matchingCoin.market_cap : 0,
            market_cap_rank: matchingCoin ? matchingCoin.market_cap_rank : 0,
            circulating_supply: matchingCoin ? matchingCoin.circulating_supply : 0,
            total_supply: matchingCoin ? matchingCoin.total_supply : 0,
            max_supply: matchingCoin ? matchingCoin.max_supply : 0,
            ath: matchingCoin ? matchingCoin.ath : 0,
            ath_change_percentage: matchingCoin ? matchingCoin.ath_change_percentage : 0,
          };
        });
      // 按市值降序排序
      updatedCryptos.sort((a: CryptoProps, b: CryptoProps) => b.market_cap - a.market_cap);
      tempData.current = updatedCryptos;
    };

    // 每兩秒更新一次數據
    const interval = setInterval(() => {
      setCryptos([...tempData.current]);
    }, 2000);

    // 清理 WebSocket 和定時器
    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, [coinInfo]);

  return (
    <>
      <Head>
        <title>{SEO.Market.title}</title>
        <meta name="description" content={SEO.Market.description} />
        <meta property="og:title" content={SEO.Market.title} />
        <meta property="og:description" content={SEO.Market.description} />
        <meta property="og:image" content={SEO.Market.image} />
        <meta property="og:type" content={SEO.Market.type} />
        <meta name="twitter:title" content={SEO.Market.title} />
        <meta name="twitter:description" content={SEO.Market.description} />
        <meta name="twitter:image" content={SEO.Market.image} />
      </Head>
      <div className="mx-5 my-2">
        {
          cryptos.length > 0 ?
            <MarketTable
              head={['幣種', '交易所', '價格', '24h%', '24h成交量', '最高', '最低']}
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
              tab={[
                {
                  label: "Pionex",
                  value: "pionex",
                  color: "bg-[#FF702A]",
                  bgColor: "text-white",
                  disabled: false,
                },
                {
                  label: "Binance",
                  value: "binance",
                  color: "bg-[#F0B90C]",
                  bgColor: "text-white",
                  disabled: false,
                },
                {
                  label: "OKX",
                  value: "okx",
                  color: "bg-[#000000]",
                  bgColor: "text-white",
                  disabled: false,
                },
                {
                  label: "BingX",
                  value: "bingx",
                  color: "bg-[#2A54FF]",
                  bgColor: "text-white",
                  disabled: false,
                },
                {
                  label: "Bitget",
                  value: "bitget",
                  color: "bg-[#00F0FF]",
                  bgColor: "text-white",
                  disabled: false,
                },
                {
                  label: "Bitunix",
                  value: "bitunix",
                  color: "bg-[#B9F642]",
                  bgColor: "text-white",
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

// 使用 getServerSideProps 在服務器端獲取初始數據
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
