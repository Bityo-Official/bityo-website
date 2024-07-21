import Head from "next/head";
import MarketTable from "@/components/Table/MarketTable";
import Bitcoin from "@/images/photos/btc.png";
import SEO from "@/config/SEO.json";

const markets = () => {
  return (
    <>
      <Head>
        <title>{SEO.Market.title}</title>
        <meta name="description" content={SEO.Market.description} />
        <meta property="og:title" content={SEO.Market.title} />
        <meta property="og:description" content={SEO.Market.description} />
        <meta property="og:image" content={SEO.Market.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.Market.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.Market.title} />
        <meta name="twitter:description" content={SEO.Market.description} />
        <meta name="twitter:image" content={SEO.Market.image} />
      </Head>
      <div className="mx-5">
        <MarketTable
          head={['幣種', '交易所', '價格', '24h%', '24h成交量', '最高', '最低']}
          rows={[
            {
              img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
              name: "BTCUSDT",
              full_name: "比特幣 Bitcoin",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
            {
              img: 'https://d1f183e4ae.cbaul-cdnwnd.com/ab81c757821eaba4888325c25f532c0e/200000034-98f7799f0b/ETH.png?ph=d1f183e4ae',
              name: "ETHUSDT",
              full_name: "以太坊 Ethereum",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
            {
              img: 'https://s3.coinmarketcap.com/static-gravity/image/4aec70f6f1254e4f89650cc68ae49f3c.png',
              name: "ADAUSDT",
              full_name: "愛達幣 Cardano",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
            {
              img: 'https://d1f183e4ae.cbaul-cdnwnd.com/ab81c757821eaba4888325c25f532c0e/200000049-b382fb4824/BNB.png?ph=d1f183e4ae',
              name: "BNBUSDT",
              full_name: "幣安幣 Binance Coin",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
            {
              img: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
              name: "SOLUSDT",
              full_name: "Solana",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
            {
              img: 'https://upload.wikimedia.org/wikipedia/zh/d/d0/Dogecoin_Logo.png',
              name: "DOGEUSDT",
              full_name: "狗狗幣 Doge Coin",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
            {
              img: 'https://assets.coingecko.com/coins/images/25244/large/Optimism.png?1696524385',
              name: "OPUSDT",
              full_name: "Optimism",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
            {
              img: 'https://s2.coinmarketcap.com/static/img/coins/200x200/11841.png',
              name: "ARBUSDT",
              full_name: "Arbitrum",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
            {
              img: 'https://s2.coinmarketcap.com/static/img/coins/200x200/21794.png',
              name: "APTUSDT",
              full_name: "Aptos",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
            {
              img: 'https://s3.coinmarketcap.com/static-gravity/image/5bd0f43855f6434386c59f2341c5aaf0.png',
              name: "SUIUSDT",
              full_name: "Sui",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
            {
              img: 'https://s2.coinmarketcap.com/static/img/coins/200x200/28177.png',
              name: "PYTHUSDT",
              full_name: "PYTH Network",
              price: 0,
              vol24h: 0,
              vol24p: 0,
              high: 0,
              low: 0,
              // online: true,
            },
          ]}
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
      </div>
    </>
  );
}

export default markets;