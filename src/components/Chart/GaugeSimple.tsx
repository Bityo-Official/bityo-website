import { GaugeSimpleProps } from '@/types/Chart/GaugeSimple';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import echarts from '@/util/echarts';
import { useTheme } from 'next-themes';

const GaugeSimple = (props: GaugeSimpleProps) => {
  const { theme } = useTheme();

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={props.option}
      className='w-full'
      theme={theme}
    />
  );
};

export default GaugeSimple;
