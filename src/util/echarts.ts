import * as echarts from "echarts/core";
import { CandlestickChart, GaugeChart, LineChart } from "echarts/charts";
import {
  AxisPointerComponent,
  GridComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import darkTheme from "echarts/lib/theme/dark";

/**
 * 只註冊專案實際用到的圖表與元件。
 * 直接 import 'echarts' 會把整包（約 1.1MB）打進 bundle，
 * 但本站只用到折線圖、K 線圖與儀表板。
 */
echarts.use([
  LineChart,
  CandlestickChart,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  AxisPointerComponent,
  GridComponent,
  ToolboxComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

// 完整版 echarts 內建 'dark' 主題，core 版沒有，需要自己註冊
echarts.registerTheme("dark", darkTheme);

export default echarts;
