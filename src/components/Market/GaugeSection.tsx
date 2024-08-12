import GaugeSimple from "../Chart/GaugeSimple";

const GaugeSection = (
  props: {
    value: number;
    fngLevel: string;
    convertFngLevel: (value: number) => string;
  }
) => {
  // 恐懼與貪婪指數儀表板選項
  const gaugeOption = {
    backgroundColor: 'transparent',
    color: ['transparent'],
    tooltip: {
      formatter: `{a} <br/>{b}&emsp;{c}%<br />程度：${props.fngLevel}`,
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
            return '{value|' + value.toFixed(0) + '}{unit|' + props.convertFngLevel(value) + '}';
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
            value: props.value,
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

  return (
    <GaugeSimple
      option={gaugeOption}
    />
  );
}

export default GaugeSection;