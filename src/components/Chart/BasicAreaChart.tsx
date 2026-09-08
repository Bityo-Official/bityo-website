import { BasicAreaChartProps } from '@/types/Chart/BasicAreaChart';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import echarts from '@/util/echarts';
import { useTheme } from 'next-themes';
import { memo } from 'react';

const BasicAreaChart = (props: BasicAreaChartProps) => {
  const { theme } = useTheme();

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={props.option}
      className='w-full'
      theme={theme}
      onEvents={props.onEvents}
    />
  );
};

export default memo(BasicAreaChart);
