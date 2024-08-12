import { useCallback } from "react";
import BasicAreaChart from "../Chart/BasicAreaChart";
import { MergedDataItem } from "@/types/Chart/GaugeSimple";

const AreaChartSection = (
  props: {
    mergedData: MergedDataItem[];
    setValue: React.Dispatch<React.SetStateAction<number>>;
    convertFngLevel: (value: number) => string;
  }
) => {

  // 圖表滑鼠懸停事件
  const handleChartHover = (params: any) => {
    if (params && params[0]) {
      props.setValue(params[0].value[1]);
    }
  }

  // 圖表滑鼠離開事件
  const handleChartMouseOut = useCallback(() => {
    props.setValue(props.mergedData[props.mergedData.length - 1].fngValue);
  }, [props, props.mergedData]);

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
          程度: ${props.convertFngLevel(fngValue)} <br />
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
        data: props.mergedData.map(item => [item.date, item.fngValue])
      },
      {
        name: '比特幣價格',
        type: 'candlestick', // 使用K線圖
        yAxisIndex: 1,
        data: props.mergedData.map(item => [
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

  // 圖表事件
  const onEvents = {
    'globalout': handleChartMouseOut,
  };

  return (
    <BasicAreaChart
      option={areaChartOption}
      onEvents={onEvents}
    />
  )
}

export default AreaChartSection;