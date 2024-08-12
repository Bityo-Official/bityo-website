import Head from "next/head";
import SEO from "@/config/SEO.json";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import GaugeSimple from "@/components/Chart/GaugeSimple";
import BasicAreaChart from "@/components/Chart/BasicAreaChart";
import { BitcoinHistoryPriceProps, FearAndGreedProps, MergedDataItem } from "@/types/Chart/GaugeSimple";

// 轉換恐懼與貪婪指數等級
const convertFngLevel = (value: number): string => {
  switch (true) {
    case value >= 0 && value < 20:
      return '極度恐懼';
    case value >= 20 && value < 40:
      return '恐懼';
    case value >= 40 && value < 60:
      return '中性';
    case value >= 60 && value < 80:
      return '貪婪';
    case value >= 80 && value <= 100:
      return '極度貪婪';
    default:
      return '';
  }
}

// 計算恐懼與貪婪指數等級天數
const calculateDays = (mergedData: MergedDataItem[], min: number, max: number): number => {
  return mergedData.map(
    item => item.fngValue >= min && item.fngValue < max ? 1 : 0
  ).reduce((acc: number, cur: number) => acc + cur, 0);
}

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

  // 圖表滑鼠懸停事件
  const handleChartHover = (params: any) => {
    if (params && params[0]) {
      setValue(params[0].value[1]);
    }
  }

  // 圖表滑鼠離開事件
  const handleChartMouseOut = useCallback(() => {
    setValue(mergedData[mergedData.length - 1].fngValue);
  }, [mergedData]);

  // 貪婪圖表選項
  const areaChartOption = {
    backgroundColor: 'transparent',
    title: {
      text: '恐懼與貪婪指數與比特幣價格走勢圖',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: function (params: any) {
        handleChartHover(params);
        const date = params[0].data[0];
        const fngValue = params[0].data[1] ?? 'N/A';
        const open = params[1].data[1] ?? 'N/A';
        const close = params[1].data[2] ?? 'N/A';
        const low = params[1].data[3] ?? 'N/A';
        const high = params[1].data[4] ?? 'N/A';

        return `
          ${date} <br/>
          恐懼貪婪指數: ${fngValue} <br />
          程度: ${convertFngLevel(fngValue)} <br />
          開盤價: $${open} <br />
          收盤價: $${close} <br />
          最低價: $${low} <br />
          最高價: $${high} <br />
        `;
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {
          name: '恐懼與貪婪指數與比特幣價格走勢圖'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        rotate: 45,
      },
      splitLine: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        },
        max: 100,
        name: '恐懼貪婪指數',
      },
      {
        type: 'value',
        splitLine: {
          show: false
        },
        name: '比特幣價格',
        position: 'right',
        axisLabel: {
          formatter: function (value: number) {
            return value / 1000 + 'K'; // 使用 K 為單位顯示
          }
        },
        min: function (value: { min: number; max: number }) {
          return Math.floor(value.min / 10000) * 10000; // 將最小值設置為最接近的 10,000
        },
        max: function (value: { min: number; max: number }) {
          return Math.ceil(value.max / 10000) * 10000; // 將最大值設置為最接近的 10,000
        }
      }
    ],
    visualMap: {
      show: false,
      type: 'piecewise',
      dimension: 1,
      pieces: [
        { min: 0, max: 20, color: '#17FFAD' },
        { min: 20, max: 40, color: '#ffff00' },
        { min: 40, max: 60, color: '#ffa500' },
        { min: 60, max: 80, color: '#FF0000' },
        { min: 80, max: 100, color: '#810B39' }
      ]
    },
    series: [
      {
        name: '恐懼貪婪指數',
        type: 'line',
        stack: '總量',
        areaStyle: {},
        lineStyle: {
          color: 'rgba(255, 0, 0, 1)', // 線段顏色
        },
        emphasis: {
          focus: 'series'
        },
        data: mergedData.map(item => [item.date, item.fngValue])
      },
      {
        name: '比特幣價格',
        type: 'candlestick', // 使用K線圖
        yAxisIndex: 1,
        data: mergedData.map(item => [
          item.date,
          item.open, // 開盤價
          item.close, // 收盤價
          item.low, // 最低價
          item.high // 最高價
        ]),
        itemStyle: {
          color: 'rgba(0, 0, 255, 1)',  // 陽線顏色
          color0: 'rgba(255, 0, 0, 1)', // 陰線顏色
          borderColor: 'rgba(0, 0, 255, 1)',  // 陽線邊框顏色
          borderColor0: 'rgba(255, 0, 0, 1)' // 陰線邊框顏色
        },
        zlevel: 1
      }
    ]
  };

  // 恐懼與貪婪指數儀表板選項
  const gaugeOption = {
    backgroundColor: 'transparent',
    color: ['transparent'],
    tooltip: {
      formatter: `{a} <br/>{b}&emsp;{c}%<br />程度：${fngLevel}`,
    },
    toolbox: {
      feature: {
        saveAsImage: {
          name: '恐懼與貪婪指數與比特幣價格走勢圖'
        }
      }
    },
    series: [
      {
        min: 0,
        max: 100,
        splitNumber: 10,
        name: "數據",
        type: "gauge",
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: function (value: number) {
            return '{value|' + value.toFixed(0) + '}{unit|' + convertFngLevel(value) + '}';
          },
          fontSize: 45,
          rich: {
            unit: {
              fontSize: 15,
              color: '#999',
              padding: [0, 0, -20, 10]
            }
          },
          offsetCenter: [1, '70%']
        },
        data: [
          {
            value,
            name: "恐懼與貪婪指數",
          }
        ],
        anchor: {
          show: true,
          size: 20,
          itemStyle: {
            borderColor: '#17FFAD',
            borderWidth: 2
          }
        },
        splitLine: {
          distance: -20,
          length: 20,
          lineStyle: {
            width: 2,
            color: 'auto'
          }
        },
        axisLabel: {
          fontSize: 20,
          distance: -30,
          rotate: 'tangential',
          color: 'auto',
          formatter: function (value: number) {
            if (value === 10) {
              return '極度恐懼';
            } else if (value === 30) {
              return '恐懼';
            } else if (value === 50) {
              return '中性';
            } else if (value === 70) {
              return '貪婪';
            } else if (value === 90) {
              return '極度貪婪';
            }
            return '';
          }
        },
        axisLine: {
          lineStyle: {
            color: [
              [0.2, '#17FFAD'],
              [0.4, '#ffff00'],
              [0.6, '#ffa500'],
              [0.8, '#FF0000'],
              [1, '#810B39']
            ],
            width: 10
          }
        },
        pointer: {
          itemStyle: {
            color: '#17FFAD' // 指针颜色
          }
        }
      }
    ]
  };

  // 圖表事件
  const onEvents = {
    'globalout': handleChartMouseOut,
  };

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
            <GaugeSimple
              option={gaugeOption}
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
          <BasicAreaChart
            option={areaChartOption}
            onEvents={onEvents}
          />
        </div>
      </div>
    </>
  );
};

export default FearAndGreed;
