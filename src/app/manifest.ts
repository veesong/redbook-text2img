import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo-config';
import { withBasePath, BASE_PATH } from '@/lib/config';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  const basePath = BASE_PATH;
  const startUrl = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const scope = basePath.endsWith('/') ? basePath : `${basePath}/`;

  return {
    name: siteConfig.name,
    short_name: '小红书图片生成器',
    description: siteConfig.description,
    start_url: startUrl,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000',
    orientation: 'portrait',
    scope: scope,
    lang: 'zh-CN',
    categories: ['productivity', 'utilities', 'graphics'],
    icons: [
      {
        src: withBasePath('/icon-72.png'),
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: withBasePath('/icon-96.png'),
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: withBasePath('/icon-128.png'),
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: withBasePath('/icon-192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: withBasePath('/icon-256.png'),
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: withBasePath('/icon-384.png'),
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: withBasePath('/icon-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: withBasePath('/icon-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: withBasePath('/screenshot-1.png'),
        sizes: '2806x1696',
        type: 'image/png',
        form_factor: 'wide',
        label: '小红书图片生成器界面截图',
      },
    ],
  };
}
