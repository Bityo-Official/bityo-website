import Head from "next/head";
import SEO from "@/config/SEO.json";
import axios from "axios";
import { useEffect, useState } from "react";
import GaugeSimple from "@/components/Chart/GaugeSimple";

const FearAndGreed = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchFearAndGreedIndex = async () => {
      try {
        const response = await axios.get('https://api.alternative.me/fng/?limit=1&date_format=cn');
        const latestValue = response.data.data[0].value;
        setValue(parseInt(latestValue, 10));
      } catch (error) {
        console.error('Error fetching Fear and Greed Index:', error);
        setValue(0);
      }
    };

    fetchFearAndGreedIndex();
  }, []);

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
      <div className="mx-5 my-2">
        <GaugeSimple
          option={
            {
              backgroundColor: 'transparent',
              color: ['transparent'],
              tooltip: {
                formatter: "{a} <br/>{b}&emsp;{c}%"
              },
              series: [
                {
                  name: "數據",
                  type: "gauge",
                  progress: {
                    show: true
                  },
                  detail: {
                    valueAnimation: true,
                    formatter: "{value}"
                  },
                  data: [
                    {
                      value,
                      name: "恐懼與貪婪指數"
                    }
                  ],
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
            }
          }
        />
      </div>
    </>
  );
};

export default FearAndGreed;
