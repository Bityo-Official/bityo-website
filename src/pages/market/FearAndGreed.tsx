import Head from "next/head";
import SEO from "@/config/SEO.json";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import GaugeSimple from "@/components/Chart/GaugeSimple";
import BasicAreaChart from "@/components/Chart/BasicAreaChart";
import { FearAndGreedProps } from "@/types/Chart/GaugeSimple";

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

const FearAndGreed = () => {
  const [value, setValue] = useState(0);
  const [fngLevel, setFngLevel] = useState('');
  const [fngData, setFngData] = useState<FearAndGreedProps[]>([]);

  useEffect(() => {
    const fetchFearAndGreedIndex = async () => {
      try {
        const response = await axios.get('https://api.alternative.me/fng/?limit=365&date_format=cn');
        const data = response.data.data;
        setFngData(data);
      } catch (error) {
        console.error('Error fetching Fear and Greed Index:', error);
        setValue(0);
      }
    };

    fetchFearAndGreedIndex();
  }, []);

  useEffect(() => {
    if (fngData && fngData.length > 0) {
      const latestData = fngData[0].value;
      setValue(latestData);
    }
  }, [fngData]);

  useEffect(() => {
    setFngLevel(convertFngLevel(value));
  }, [value]);

  const handleChartHover = (params: any) => {
    if (params && params[0]) {
      setValue(params[0].value[1]);
    }
  }

  const handleChartMouseOut = useCallback(() => {
    setValue(fngData[0].value);
  }, [fngData]);

  const areaChartOption = {
    backgroundColor: 'transparent',
    title: {
      text: '恐懼與貪婪指數',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: function (params: any) {
        handleChartHover(params);
        return `
          ${new Date(params[0].axisValue).toLocaleDateString()} <br/>
          恐懼貪婪指數: ${params[0].data[1]} <br />
          程度: ${convertFngLevel(params[0].data[1])} <br />
        `;
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {
          name: '恐懼與貪婪指數'
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
      data: fngData.reverse().map(item => new Date(item.timestamp).toLocaleDateString()),
      axisLabel: {
        rotate: 45,
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      },
      max: 100
    },
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
        data: fngData.reverse().map(item => [new Date(item.timestamp).toLocaleDateString(), item.value])
      }
    ]
  };

  const gaugeOption = {
    backgroundColor: 'transparent',
    color: ['transparent'],
    tooltip: {
      formatter: `{a} <br/>{b}&emsp;{c}%<br />程度：${fngLevel}`,
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
      <div className="mx-5 my-2 flex flex-col lg:flex-row items-center">
        <GaugeSimple
          option={gaugeOption}
        />
        <BasicAreaChart
          option={areaChartOption}
          onEvents={onEvents}
        />
      </div>
    </>
  );
};

export default FearAndGreed;
