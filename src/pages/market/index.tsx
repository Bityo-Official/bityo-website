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
  const [selectedTab, setSelectedTab] = useState({
    label: "Pionex",
    value: "pionex",
    disabled: false
  });

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const updatedCryptos = data
        .filter((crypto: any) => crypto.s.endsWith('USDT'))
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
            full_name: matchingCoin ? matchingCoin.name.replace(' ', '-') : '',
            market_cap: matchingCoin ? matchingCoin.market_cap : 0,
            market_cap_rank: matchingCoin ? matchingCoin.market_cap_rank : 0,
            circulating_supply: matchingCoin ? matchingCoin.circulating_supply : 0,
            total_supply: matchingCoin ? matchingCoin.total_supply : 0,
            max_supply: matchingCoin ? matchingCoin.max_supply : 0,
            ath: matchingCoin ? matchingCoin.ath : 0,
            ath_change_percentage: matchingCoin ? matchingCoin.ath_change_percentage : 0,
          };
        });
      updatedCryptos.sort((a: CryptoProps, b: CryptoProps) => b.market_cap - a.market_cap);
      tempData.current = updatedCryptos;
    };

    const interval = setInterval(() => {
      setCryptos([...tempData.current]);
    }, 2000);

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, [coinInfo]);

  useEffect(() => {
    console.log(selectedTab);
  }, [selectedTab]);

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
