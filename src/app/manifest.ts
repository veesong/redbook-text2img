import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo-config';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: '小红书图片生成器',
    description: siteConfig.description,
    start_url: '/redbook-text2img/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000',
    orientation: 'portrait',
    scope: '/redbook-text2img/',
    lang: 'zh-CN',
    categories: ['productivity', 'utilities', 'graphics'],
    icons: [
      {
        src: '/redbook-text2img/icon-72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/redbook-text2img/icon-96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/redbook-text2img/icon-128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/redbook-text2img/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/redbook-text2img/icon-256.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/redbook-text2img/icon-384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/redbook-text2img/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/redbook-text2img/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/redbook-text2img/screenshot-1.png',
        sizes: '2806x1696',
        type: 'image/png',
        form_factor: 'wide',
        label: '小红书图片生成器界面截图',
      },
    ],
  };
}
