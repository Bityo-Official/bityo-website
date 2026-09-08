import SEO from "@/config/SEO.json";
import { useEffect, useState } from "react";
import { MergedDataItem } from "@/types/Chart/GaugeSimple";
import GaugeSection from "@/components/Market/GaugeSection";
import AreaChartSection from "@/components/Market/AreaChartSection";
import SkeletonTable from "@/components/Skeleton/SkeletonTable";
import { calculateDays, convertFngLevel } from "@/util/Market/FNG";
import Seo from "@/components/Seo";

const FearAndGreed = () => {
  // value 除了資料載入時的初始值外，也會被圖表 hover 事件改寫，所以必須是 state
  const [value, setValue] = useState(0);
  const [mergedData, setMergedData] = useState<MergedDataItem[]>([]);
  const [loadFailed, setLoadFailed] = useState(false);

  // 純粹由 value 推導，不需要額外的 state + effect
  const fngLevel = convertFngLevel(value);

  // 取得恐懼與貪婪指數與比特幣價格。
  // 資料合併改在 /api/getFearAndGreed 的伺服器端做：
  // 原本前端直接打的 cryptocompare 現在需要 API key（回 401），整頁因此空白。
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('/api/getFearAndGreed');
        if (!res.ok) throw new Error(`API responded ${res.status}`);

        const data: MergedDataItem[] = await res.json();
        if (cancelled) return;

        setMergedData(data);
        if (data.length > 0) {
          setValue(data[data.length - 1].fngValue);
        }
      } catch (error) {
        console.error('Error fetching fear and greed data:', error);
        if (!cancelled) setLoadFailed(true);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <Seo meta={SEO.FNG} />
      {loadFailed ? (
        <div className="m-5 rounded-2xl bg-neutral-200 p-8 text-center dark:bg-neutral-800/50">
          <p className="text-lg font-medium">目前無法取得恐懼與貪婪指數資料</p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            請稍後再試，或重新整理頁面。
          </p>
        </div>
      ) : mergedData.length === 0 ? (
        <div className="m-5 rounded-2xl bg-neutral-200 p-5 dark:bg-neutral-800/50">
          <SkeletonTable />
        </div>
      ) : (
      <div className="m-5 p-5 rounded-2xl bg-neutral-200 dark:bg-neutral-800/50">
        <div className="grid grid-cols-2 justify-items-center">
          <div className="w-full">
            <GaugeSection
              value={value}
              fngLevel={fngLevel}
              convertFngLevel={convertFngLevel}
            />
          </div>
          <div className="w-full items-center">
            <p className="text-xl">恐懼與貪婪指數</p>
            <table className="w-full border-collapse table-fixed">
              <tbody>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">極度恐懼</td>
                  {/* 統計 */}
                  <td>
                    {calculateDays(mergedData, 0, 20)} 天
                    ({(calculateDays(mergedData, 0, 20) / 365 * 100).toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">恐懼</td>
                  <td>
                    {calculateDays(mergedData, 20, 40)} 天
                    ({(calculateDays(mergedData, 20, 40) / 365 * 100).toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">中性</td>
                  <td>
                    {calculateDays(mergedData, 40, 60)} 天
                    ({(calculateDays(mergedData, 40, 60) / 365 * 100).toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">貪婪</td>
                  <td>
                    {calculateDays(mergedData, 60, 80)} 天
                    ({(calculateDays(mergedData, 60, 80) / 365 * 100).toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">極度貪婪</td>
                  <td>
                    {calculateDays(mergedData, 80, 100)} 天
                    ({(calculateDays(mergedData, 80, 100) / 365 * 100).toFixed(2)}%)
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">平均</td>
                  <td>
                    {(mergedData.map(item => parseInt(item.fngValue.toString())).reduce((acc, cur) => acc + cur, 0) / mergedData.length).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-900 dark:text-neutral-300">近 365 天</td>
                  <td>
                    {convertFngLevel(mergedData.map(item => parseInt(item.fngValue.toString())).reduce((acc, cur) => acc + cur, 0) / mergedData.length)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-5 my-2 flex flex-col lg:flex-row items-center">
          <AreaChartSection
            mergedData={mergedData}
            setValue={setValue}
            convertFngLevel={convertFngLevel}
          />
        </div>
      </div>
      )}
    </>
  );
};

export default FearAndGreed;
