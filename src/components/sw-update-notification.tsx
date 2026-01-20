'use client';

import { memo, useEffect, useState } from 'react';
import { RefreshCwIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useServiceWorker } from '@/hooks/use-service-worker';

export const SWUpdateNotification = memo(() => {
  const { updateAvailable, skipWaiting } = useServiceWorker();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (updateAvailable) {
      // Show notification with a small delay
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [updateAvailable]);

  // Auto-dismiss after 30 seconds
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), 30000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible || !updateAvailable) {
    return null;
  }

  const handleRefresh = () => {
    skipWaiting();
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 shadow-lg animate-in slide-in-from-bottom">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="flex-1 text-sm text-foreground">
            新版本可用，点击刷新按钮获取最新功能
          </p>
          <div className="flex items-center gap-2">
            <Button
              aria-label="关闭通知"
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
            >
              稍后
            </Button>
            <Button
              aria-label="刷新更新"
              size="sm"
              onClick={handleRefresh}
            >
              <RefreshCwIcon aria-hidden="true" className="mr-2 h-4 w-4" />
              刷新
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

SWUpdateNotification.displayName = 'SWUpdateNotification';
