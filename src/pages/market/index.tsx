import Head from "next/head";
import MarketTable from "@/components/Table/MarketTable";
import Bitcoin from "@/images/photos/btc.png";

const markets = () => {
  return (
    <>
      <Head>
        <title>市場行情</title>
      </Head>
      <div className="mx-5">
        <MarketTable
          head={['幣種', '價格', '漲跌', '漲跌幅', '成交量', '成交額', '最高', '最低', '24H']}
          rows={[
            {
              img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
              name: "BTCUSDT",
              full_name: "比特幣 Bitcoin",
              price: 69000
              // online: true,
            },
            {
              img: 'https://d1f183e4ae.cbaul-cdnwnd.com/ab81c757821eaba4888325c25f532c0e/200000034-98f7799f0b/ETH.png?ph=d1f183e4ae',
              name: "ETHUSDT",
              full_name: "以太坊 Ethereum",
              price: 3000
              // online: true,
            },
            {
              img: 'https://s3.coinmarketcap.com/static-gravity/image/4aec70f6f1254e4f89650cc68ae49f3c.png',
              name: "ADAUSDT",
              full_name: "愛達幣 Cardano",
              price: 0.7
              // online: true,
            },
          ]}
          tab={[
            {
              label: "Pionex",
              value: "pionex",
              disabled: false,
            },
            {
              label: "Bitunix",
              value: "bitunix",
              disabled: true,
            },
            {
              label: "Binance",
              value: "binance",
              disabled: true,
            },
            {
              label: "BingX",
              value: "bingx",
              disabled: true,
            },
          ]}
        />
      </div>
    </>
  );
}

export default markets;