import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // GitHub Pages 基础路径配置
  basePath: '/redbook-text2img',
  assetPrefix: '/redbook-text2img',

  // 静态导出配置（GitHub Pages 需要）
  output: 'export',

  // 确保路由正常工作
  trailingSlash: true,

  // 原有配置
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
