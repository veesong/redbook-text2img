'use client';

import { useEffect } from 'react';
import { useServiceWorker } from '@/hooks/use-service-worker';
import { SWUpdateNotification } from './sw-update-notification';

export function ServiceWorkerProvider() {
  useServiceWorker();

  return <SWUpdateNotification />;
}
