'use client';

import { WifiOffIcon } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <WifiOffIcon className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-2 font-bold text-foreground text-2xl">
          您当前处于离线状态
        </h1>
        <p className="mb-6 text-muted-foreground">
          请检查您的网络连接后刷新页面
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            href="/"
          >
            返回首页
          </Link>
          <button
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => window.location.reload()}
          >
            刷新页面
          </button>
        </div>
      </div>
    </div>
  );
}
