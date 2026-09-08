import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * 伺服器端與 hydration 期間回傳 false，掛載完成後回傳 true。
 * 用來取代 `useState(false)` + `useEffect(() => setMounted(true), [])`：
 * 同樣能避免 hydration 不一致，但不會在 effect 裡同步 setState。
 */
export function useIsMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
