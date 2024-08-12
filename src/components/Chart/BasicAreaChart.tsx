import { BasicAreaChartProps } from '@/types/Chart/BasicAreaChart';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { memo } from 'react';

const BasicAreaChart = (props: BasicAreaChartProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <ReactECharts
      option={props.option}
      className='w-full'
      theme={theme}
      onEvents={props.onEvents} 
    />
  );
};

export default memo(BasicAreaChart);
