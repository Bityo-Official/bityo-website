import type { GetServerSideProps } from 'next';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bityo.tw').replace(/\/$/, '');

/** 可被索引的靜態路由；動態路由（成員、交易對）與 404 不列入 */
const ROUTES: { path: string; changefreq: string; priority: string }[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/market', changefreq: 'hourly', priority: '0.9' },
  { path: '/market/FearAndGreed', changefreq: 'daily', priority: '0.8' },
  { path: '/exchange', changefreq: 'weekly', priority: '0.8' },
  { path: '/community', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
  { path: '/verify', changefreq: 'monthly', priority: '0.7' },
  { path: '/cooperate/partners', changefreq: 'monthly', priority: '0.6' },
  { path: '/doc/api', changefreq: 'monthly', priority: '0.5' },
];

const buildSitemap = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = ROUTES.map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.write(buildSitemap());
  res.end();

  return { props: {} };
};

// getServerSideProps 直接輸出 XML，這個元件不會被實際渲染
const Sitemap = () => null;

export default Sitemap;
