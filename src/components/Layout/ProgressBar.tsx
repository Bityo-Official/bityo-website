import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

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
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    const start = () => {
      clearTimers();
      setVisible(true);
      setProgress(0);
      // 先快速衝到 30%，再緩慢爬升，營造載入中的感覺
      timers.current.push(setTimeout(() => setProgress(30), 50));
      timers.current.push(setTimeout(() => setProgress(65), 350));
      timers.current.push(setTimeout(() => setProgress(85), 900));
    };

    const done = () => {
      clearTimers();
      setProgress(100);
      timers.current.push(
        setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 300),
      );
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
      clearTimers();
    };
  }, [router]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999]"
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
