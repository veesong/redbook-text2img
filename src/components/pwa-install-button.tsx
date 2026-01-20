'use client';

import { memo } from 'react';
import { DownloadIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { usePWAInstall } from '@/hooks/use-pwa-install';

export const PWAInstallButton = memo(() => {
  const { canInstall, promptInstall } = usePWAInstall();

  if (!canInstall) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="安装应用"
            size="icon"
            title="安装应用"
            variant="outline"
            onClick={promptInstall}
          >
            <DownloadIcon aria-hidden="true" className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>安装应用到桌面，离线也能使用</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

PWAInstallButton.displayName = 'PWAInstallButton';
