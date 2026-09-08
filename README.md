# Docs of Bityo Website

幣友 BITYO 官方網站（Next.js Pages Router）。

## 技術棧

| 項目 | 版本 |
| --- | --- |
| Next.js | 16（Turbopack） |
| React | 19 |
| TypeScript | 5.9 |
| Tailwind CSS | 4（CSS-first 設定，見 `src/styles/globals.css`） |
| ESLint | 9（flat config，見 `eslint.config.mjs`） |
| 套件管理 | pnpm |

其他主要套件：Firebase / Firebase Admin、ECharts、Swiper、SWR、Ethers、
Headless UI、Floating UI、Font Awesome、Heroicons、next-themes。

UI 元件放在 `src/components/ui/`，是本專案自有的實作
（不再依賴 `@material-tailwind/react`）。

## 環境需求

* Node.js 20.9 以上
* pnpm 10 以上

首次安裝需要 `.env.local`（Firebase 設定），可參考既有的環境變數名稱。

## 開發

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## 常用指令

```bash
pnpm build        # 產生正式版
pnpm start        # 啟動正式版
pnpm lint         # ESLint（注意：Next 16 已移除 next lint）
pnpm typecheck    # tsc --noEmit
```

## 注意事項

* Tailwind 的主題（顏色、字級、陰影）定義在 `src/styles/globals.css` 的
  `@theme` 區塊，Tailwind 4 起不再使用 `tailwind.config.ts`。
* `AGENTS.md` 與 `CLAUDE.md` 由 `next dev` 自動產生並維護，請勿手動編輯。
* `pnpm-workspace.yaml` 的 `allowBuilds` 控制哪些套件可以執行安裝腳本，
  新增依賴後若出現 `ERR_PNPM_IGNORED_BUILDS` 需在此補上設定。

## 更多資訊

* [Official Website](https://bityo.tw)
* [Our Discord](https://dc.bityo.tw)
* [Our Line](https://line.bityo.tw)
