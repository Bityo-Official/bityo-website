import Head from "next/head";
import { useRouter } from "next/router";

// 部署網域；Vercel 上可用 NEXT_PUBLIC_SITE_URL 覆寫
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bityo.tw").replace(/\/$/, "");
const SITE_NAME = "幣友 Bityo";

export interface SeoMeta {
  title: string;
  description: string;
  image: string;
  type: string;
  keyword?: string;
  author?: string;
  copyright?: string;
}

interface SeoProps {
  meta: SeoMeta;
  /** 覆寫正規網址路徑，預設取目前路由 */
  path?: string;
  /** 不希望被索引的頁面（例如 404） */
  noindex?: boolean;
}

/**
 * 各頁共用的 SEO meta。
 * 原本每頁都手寫一份，且缺少 canonical、og:url、keywords、author，
 * SEO.json 裡的 keyword / author 欄位也從來沒被輸出。
 */
const Seo = ({ meta, path, noindex = false }: SeoProps) => {
  const router = useRouter();
  const pathname = (path ?? router.asPath).split("?")[0].split("#")[0];
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  const image = meta.image.startsWith("http") ? meta.image : `${SITE_URL}${meta.image}`;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keyword && <meta name="keywords" content={meta.keyword} />}
      {meta.author && <meta name="author" content={meta.author} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="zh_TW" />
      <meta property="og:type" content={meta.type} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default Seo;
