import { GaugeSimpleProps } from '@/types/Chart/GaugeSimple';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';

const GaugeSimple = (props: GaugeSimpleProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <ReactECharts
      option={props.option}
      className='w-full'
      theme={theme}
    />
  )
};

export default GaugeSimple;
