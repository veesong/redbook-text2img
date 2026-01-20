import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // GitHub Pages 基础路径配置
  // 可通过环境变量 NEXT_PUBLIC_BASE_PATH 自定义，默认为 '/redbook-text2img'
  // 设置为空字符串 '' 可部署到根路径
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/redbook-text2img',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/redbook-text2img',

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

  // 将 BASE_PATH 暴露给客户端
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '/redbook-text2img',
  },
};

export default nextConfig;
