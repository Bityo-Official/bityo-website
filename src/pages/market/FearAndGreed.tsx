import Head from "next/head";
import SEO from "@/config/SEO.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { BitcoinHistoryPriceProps, FearAndGreedProps, MergedDataItem } from "@/types/Chart/GaugeSimple";
import GaugeSection from "@/components/Market/GaugeSection";
import AreaChartSection from "@/components/Market/AreaChartSection";
import { calculateDays, convertFngLevel } from "@/util/Market/FNG";

const FearAndGreed = () => {
  const [value, setValue] = useState(0);
  const [fngLevel, setFngLevel] = useState('');
  const [mergedData, setMergedData] = useState<MergedDataItem[]>([]);

  // 取得恐懼與貪婪指數與比特幣價格
  useEffect(() => {
    const fetchAndMergeData = async () => {
      try {
        const [fngResponse, btcResponse] = await Promise.all([
          axios.get('https://api.alternative.me/fng/?limit=365&date_format=cn'),
          axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=365')
        ]);

        const fngData: FearAndGreedProps[] = fngResponse.data.data;
        const bitcoinHistoryPrice: BitcoinHistoryPriceProps[] = btcResponse.data.Data.Data;

        const fngMap = new Map();
        fngData.forEach(item => {
          const date = new Date(item.timestamp).toLocaleDateString();
          fngMap.set(date, item.value);
        });

        const mergedData: MergedDataItem[] = bitcoinHistoryPrice.map(item => {
          const date = new Date(Number(item.time) * 1000).toLocaleDateString();
          if (fngMap.has(date)) {
            return {
              date,
              fngValue: fngMap.get(date),
              open: item.open,
              close: item.close,
              low: item.low,
              high: item.high,
            };
          }
          return null;
        }).filter(item => item !== null) as MergedDataItem[];

        setMergedData(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAndMergeData();
  }, []);

  // 更新最新貪婪程度
  useEffect(() => {
    if (mergedData && mergedData.length > 0) {
      const latestData = mergedData[mergedData.length - 1].fngValue;
      setValue(latestData);
    }
  }, [mergedData]);

  // 更新貪婪程度
  useEffect(() => {
    setFngLevel(convertFngLevel(value));
  }, [value]);

  return (
    <>
      <Head>
        <title>{SEO.FNG.title}</title>
        <meta name="description" content={SEO.FNG.description} />
        <meta property="og:title" content={SEO.FNG.title} />
        <meta property="og:description" content={SEO.FNG.description} />
        <meta property="og:image" content={SEO.FNG.image} />
        <meta property="og:type" content={SEO.FNG.type} />
        <meta name="twitter:title" content={SEO.FNG.title} />
        <meta name="twitter:description" content={SEO.FNG.description} />
        <meta name="twitter:image" content={SEO.FNG.image} />
      </Head>
      <div className="m-5 p-5 rounded-2xl bg-neutral-200 dark:bg-neutral-800/50">
        <div className="grid grid-cols-2 justify-items-center">
          <div className="w-full">
            <GaugeSection
              value={value}
              fngLevel={fngLevel}
              convertFngLevel={convertFngLevel}
            />
          </div>
          <div className="w-full items-center">
            <p className="text-xl">恐懼與貪婪指數</p>
            <table className="w-full border-collapse table-fixed">
              <tbody>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">極度恐懼</td>
                  {/* 統計 */}
                  <td>
                    {calculateDays(mergedData, 0, 20)} 天
                    ({(calculateDays(mergedData, 0, 20) / 365 * 100).toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">恐懼</td>
                  <td>
                    {calculateDays(mergedData, 20, 40)} 天
                    ({(calculateDays(mergedData, 20, 40) / 365 * 100).toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">中性</td>
                  <td>
                    {calculateDays(mergedData, 40, 60)} 天
                    ({(calculateDays(mergedData, 40, 60) / 365 * 100).toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">貪婪</td>
                  <td>
                    {calculateDays(mergedData, 60, 80)} 天
                    ({(calculateDays(mergedData, 60, 80) / 365 * 100).toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">極度貪婪</td>
                  <td>
                    {calculateDays(mergedData, 80, 100)} 天
                    ({(calculateDays(mergedData, 80, 100) / 365 * 100).toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">平均</td>
                  <td>
                    {(mergedData.map(item => parseInt(item.fngValue.toString())).reduce((acc, cur) => acc + cur, 0) / mergedData.length).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">近 365 天</td>
                  <td>
                    {convertFngLevel(mergedData.map(item => parseInt(item.fngValue.toString())).reduce((acc, cur) => acc + cur, 0) / mergedData.length)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-5 my-2 flex flex-col lg:flex-row items-center">
          <AreaChartSection
            mergedData={mergedData}
            setValue={setValue}
            convertFngLevel={convertFngLevel}
          />
        </div>
      </div>
    </>
  );
};

export default FearAndGreed;
