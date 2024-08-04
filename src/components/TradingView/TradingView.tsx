import { TradingViewProps } from '@/types/TradingView/TradingView';
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget(props: TradingViewProps) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
      "studies": [
        "STD;Average_True_Range",
        "STD;MACD",
        "STD;RSI"
      ],
      "support_host": "https://www.tradingview.com"
    });

    const currentContainer = container.current;
    if (currentContainer) {
      currentContainer.appendChild(script);
    }

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [props.symbol, props.timezone, props.theme, props.locale]);

  return (
    <div className='w-full h-[93vh]'>
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
