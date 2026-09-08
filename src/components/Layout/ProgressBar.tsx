import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  /** 進度條高度（px） */
  height?: number;
  color?: string;
}

/**
 * 換頁時顯示於頂端的進度條。
 * 取代已停止維護的 nextjs-progressbar（最後發布於 2022 年）。
 */
const ProgressBar = ({ height = 2, color = "#17FFAC" }: ProgressBarProps) => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // 相依必須是 router.events（Next 的單例 emitter）而非 router 本身：
  // router 的 identity 會在換頁時改變，effect 重跑的 cleanup 會把
  // 「完成後歸零」的計時器一起清掉，進度條就會卡在 100% 不消失。
  const events = router.events;

  useEffect(() => {
    let rampTimers: ReturnType<typeof setTimeout>[] = [];
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const clearRamp = () => {
      rampTimers.forEach(clearTimeout);
      rampTimers = [];
    };

    const start = () => {
      clearTimeout(hideTimer);
      clearRamp();
      setVisible(true);
      setProgress(0);
      // 先快速衝到 30%，再緩慢爬升，營造載入中的感覺
      rampTimers.push(
        setTimeout(() => setProgress(30), 50),
        setTimeout(() => setProgress(65), 350),
        setTimeout(() => setProgress(85), 900),
      );
    };

    const done = () => {
      clearRamp();
      setProgress(100);
      hideTimer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    };

    events.on("routeChangeStart", start);
    events.on("routeChangeComplete", done);
    events.on("routeChangeError", done);

    return () => {
      events.off("routeChangeStart", start);
      events.off("routeChangeComplete", done);
      events.off("routeChangeError", done);
      clearRamp();
      clearTimeout(hideTimer);
    };
  }, [events]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-9999"
      style={{ height }}
    >
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          opacity: visible ? 1 : 0,
          boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
