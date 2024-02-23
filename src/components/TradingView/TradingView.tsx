import { TradingViewProps } from '@/types/TradingView/TradingView';
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget(props: TradingViewProps) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 创建 script 标签并设置其内容
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": props.symbol,
      "interval": "60",
      "timezone": props.timezone,
      "theme": props.theme,
      "style": "1",
      "locale": props.locale,
      "enable_publishing": false,
      "withdateranges": true,
      "hide_side_toolbar": false,
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    });

    // 将 script 标签添加到容器中
    const currentContainer = container.current;
    if (currentContainer) {
      currentContainer.appendChild(script);
    }

    // 清理函数，当组件卸载时移除 script 标签
    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className='w-full h-[86vh]'>
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
