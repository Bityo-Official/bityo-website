// components/BasicAreaChart.tsx
import { BasicAreaChartProps } from '@/types/Chart/BasicAreaChart';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

const BasicAreaChart = (props: BasicAreaChartProps) => {
  const [isDark, setIsDark] = useState(false);

  // 监听主题模式变化
  useEffect(() => {
    const className = 'dark';
    const element = document.documentElement;

    if (element.classList.contains(className)) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (element.classList.contains(className)) {
            setIsDark(true);
          } else {
            setIsDark(false);
          }
        }
      });
    });

    observer.observe(element, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ReactECharts
      option={props.option}
      style={{ height: '460px', width: '100%' }}
      theme={isDark ? 'dark' : 'light'}
      onEvents={props.onEvents} 
    />
  );
};

export default BasicAreaChart;
