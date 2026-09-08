import { extendTailwindMerge, type ClassNameValue } from "tailwind-merge";

/**
 * tailwind-merge 預設只認得 Tailwind 內建主題，
 * 必須把 globals.css `@theme` 裡的自訂值告訴它，否則會誤判。
 * 例如 `text-h3` 會被當成文字顏色，導致 `cn("text-h3", "text-black")` 把字級砍掉。
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      // 自訂字級（--text-h1 ~ --text-h6）
      text: ["h1", "h2", "h3", "h4", "h5", "h6"],
      // 自訂陰影（--shadow-*）
      shadow: [
        "signUp", "one", "two", "three",
        "sticky", "sticky-dark",
        "feature-2", "submit", "submit-dark",
        "btn", "btn-hover", "btn-light",
      ],
      // 自訂色票（--color-*）
      color: [
        "web-green", "bityo", "body", "body-dark", "txt-dark",
        "blue-gray-50", "blue-gray-100", "blue-gray-200", "blue-gray-300", "blue-gray-400",
        "blue-gray-500", "blue-gray-600", "blue-gray-700", "blue-gray-800", "blue-gray-900",
        "primary-black-100", "primary-black-200", "primary-black-300",
        "primary-black-400", "primary-black-500",
        "neutral-white", "neutral-black", "neutral-tone-700",
        "wireframe-700",
        "func-error", "func-info", "func-warning", "func-success",
      ],
    },
  },
});

/**
 * 合併 Tailwind class，後面的會覆蓋前面衝突的 utility。
 *
 * 元件預設樣式與呼叫端傳入的 className 若同時出現同一類 utility
 * （例如 `px-6` 與 `px-8`），純字串拼接的結果取決於 Tailwind 產生 CSS 的順序，
 * 無法預期。twMerge 會直接移除較早的衝突項，讓呼叫端一定贏。
 * 原本的 @material-tailwind/react 內部也是這樣做的（tailwind-merge@1）。
 */
export function cn(...classes: ClassNameValue[]) {
  return twMerge(classes);
}
