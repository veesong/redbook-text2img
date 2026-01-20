# 部署配置指南

本项目支持通过环境变量灵活配置部署路径，无需修改代码即可适配不同的部署环境。

## 配置方式

### 1. 通过环境变量配置

创建 `.env.local` 文件（本地开发）或在部署平台设置环境变量：

```bash
# .env.local

# 基础路径配置（重要！）
# - GitHub Pages 子路径: NEXT_PUBLIC_BASE_PATH=/redbook-text2img
# - Vercel/Netlify 根路径: NEXT_PUBLIC_BASE_PATH=
# - 自定义子路径: NEXT_PUBLIC_BASE_PATH=/your-custom-path
NEXT_PUBLIC_BASE_PATH=/redbook-text2img

# 站点 URL（用于 SEO 和 metadata）
NEXT_PUBLIC_SITE_URL=https://your-username.github.io/redbook-text2img

# Google Analytics (可选)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. 不同的部署场景

#### GitHub Pages (子路径)

```bash
NEXT_PUBLIC_BASE_PATH=/redbook-text2img
NEXT_PUBLIC_SITE_URL=https://username.github.io/redbook-text2img
```

**next.config.ts 会自动使用相同的值：**
- `basePath: '/redbook-text2img'`
- `assetPrefix: '/redbook-text2img'`

#### Vercel / Netlify (根路径)

```bash
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

**注意：** `NEXT_PUBLIC_BASE_PATH=` 后面没有值，表示空字符串

#### 自定义域名 / 子路径

```bash
NEXT_PUBLIC_BASE_PATH=/app
NEXT_PUBLIC_SITE_URL=https://custom-domain.com/app
```

### 3. 验证配置

构建项目后检查生成的文件：

```bash
pnpm build

# 检查 manifest.webmanifest 中的路径
cat out/manifest.webmanifest | grep '"src"'

# 检查 HTML 中的资源路径
grep -E "og.png|icon.*\.png" out/index.html
```

所有路径都应该包含正确的基础路径前缀。

## 代码中使用

### 在代码中使用动态路径

```typescript
import { withBasePath, BASE_PATH } from '@/lib/config';

// 生成带 basePath 的完整路径
const iconPath = withBasePath('/icon-512.png');
// 结果: '/redbook-text2img/icon-512.png' (默认配置)

// 直接读取 BASE_PATH
console.log(BASE_PATH);
// 输出: '/redbook-text2img' (默认配置)
```

### 在 Next.js 组件中使用

```tsx
import { withBasePath } from '@/lib/config';

export function MyComponent() {
  return (
    <img src={withBasePath('/image.png')} alt="描述" />
  );
}
```

### 在 metadata 中使用

```typescript
import { withBasePath } from '@/lib/config';

export const metadata = {
  openGraph: {
    images: [withBasePath('/og.png')],
  },
};
```

## 自动化配置

### next.config.ts

配置文件会自动读取环境变量：

```typescript
basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/redbook-text2img',
assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/redbook-text2img',
```

这样确保了：
1. Next.js 路由使用正确的 basePath
2. 静态资源使用正确的 assetPrefix
3. 所有代码中的 `withBasePath()` 函数使用相同的值

### src/lib/config.ts

核心配置文件导出：

- `BASE_PATH`: 当前的基础路径
- `withBasePath(path)`: 为路径添加 basePath 的辅助函数
- `getBaseUrl()`: 获取完整的站点 URL

## 常见问题

### Q: 修改环境变量后不生效？

**A:** 清除缓存并重新构建：

```bash
rm -rf .next out
pnpm build
```

### Q: 本地开发环境和生产环境路径不同？

**A:** 使用 `.env.local` 配置本地环境（提交到 `.gitignore`），生产环境在部署平台配置环境变量。

### Q: 如何从根路径切换到子路径部署？

**A:** 只需修改 `NEXT_PUBLIC_BASE_PATH` 环境变量，无需修改任何代码：

```bash
# 从根路径切换到 GitHub Pages 子路径
NEXT_PUBLIC_BASE_PATH=/redbook-text2img

# 从子路径切换到根路径
NEXT_PUBLIC_BASE_PATH=
```

### Q: Service Worker 也支持动态路径吗？

**A:** 是的！Service Worker 在运行时会自动检测 basePath：

```typescript
// src/hooks/use-service-worker.ts
const basePath = window.location.pathname.split('/')[1] || '';
```

无需手动配置。

## 部署平台配置示例

### GitHub Pages

1. 在仓库设置中配置 GitHub Pages
2. 确保构建输出目录为 `out`
3. 设置环境变量（在 GitHub Actions 中）：
   ```yaml
   env:
     NEXT_PUBLIC_BASE_PATH: /redbook-text2img
   ```

### Vercel

1. 在项目设置中添加环境变量：
   ```
   NEXT_PUBLIC_BASE_PATH=
   NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
   ```
2. 或在 `.env.production` 中配置

### Netlify

1. 在 Site settings > Environment variables 中添加：
   ```
   NEXT_PUBLIC_BASE_PATH=
   NEXT_PUBLIC_SITE_URL=https://your-project.netlify.app
   ```

## 相关文件

- `next.config.ts` - Next.js 配置（读取环境变量）
- `src/lib/config.ts` - 应用配置（导出 BASE_PATH 和辅助函数）
- `src/app/manifest.ts` - PWA manifest（使用 withBasePath）
- `src/lib/seo-config.ts` - SEO 配置（使用 withBasePath）
- `src/app/layout.tsx` - 根布局（使用 withBasePath）
- `.env.example` - 环境变量示例文件
