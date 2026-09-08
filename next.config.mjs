/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 不外洩框架版本
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
      {
        // CoinGecko 現在的幣種圖示網域
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
    ],
    // 幣種圖示等外部圖片快取久一點，減少重複請求
    minimumCacheTTL: 60 * 60 * 24,
  },

  // Font Awesome 的圖示套件從進入點匯入時不會 tree-shake，
  // 會把約 3900 個圖示全部打包（單一 chunk 就 1.5MB）。
  // 改寫成深層匯入後只會帶進實際用到的圖示。
  modularizeImports: {
    '@fortawesome/free-solid-svg-icons': {
      transform: '@fortawesome/free-solid-svg-icons/{{member}}',
      skipDefaultConversion: true,
    },
    '@fortawesome/free-brands-svg-icons': {
      transform: '@fortawesome/free-brands-svg-icons/{{member}}',
      skipDefaultConversion: true,
    },
    '@fortawesome/free-regular-svg-icons': {
      transform: '@fortawesome/free-regular-svg-icons/{{member}}',
      skipDefaultConversion: true,
    },
  },
};

export default nextConfig;
