// echarts 的內建主題沒有附型別定義
declare module "echarts/lib/theme/dark" {
  const theme: Record<string, unknown>;
  export default theme;
}
