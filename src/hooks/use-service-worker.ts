'use client';

import { useEffect, useState } from 'react';

interface ServiceWorkerState {
  registration: ServiceWorkerRegistration | null;
  updateAvailable: boolean;
  waiting: ServiceWorker | null;
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    registration: null,
    updateAvailable: false,
    waiting: null,
  });

  useEffect(() => {
    // Only register service worker in production
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }

    if (!('serviceWorker' in navigator)) {
      console.log('[SW] Service Worker not supported');
      return;
    }

    // Register service worker
    registerSW();

    function registerSW() {
      // Detect basePath from current URL
      const basePath = window.location.pathname.split('/')[1] || '';
      const swUrl = basePath ? `/${basePath}/sw.js` : '/sw.js';
      const scope = basePath ? `/${basePath}/` : '/';

      console.log('[SW] Registering with:', { swUrl, scope });

      navigator.serviceWorker
        .register(swUrl, {
          scope: scope,
        })
        .then((registration) => {
          console.log('[SW] Service Worker registered:', registration);

          setState((prev) => ({ ...prev, registration }));

          // Check for updates immediately
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (
                  installingWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  // New version available
                  console.log('[SW] New content is available; please refresh.');
                  setState({
                    registration,
                    updateAvailable: true,
                    waiting: installingWorker,
                  });
                }
              });
            }
          });

          // Check if there's already a waiting service worker
          if (registration.waiting) {
            console.log('[SW] Service Worker waiting:', registration.waiting);
            setState({
              registration,
              updateAvailable: true,
              waiting: registration.waiting,
            });
          }

          // Listen for controller changes (when new SW takes control)
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('[SW] Controller changed, reloading page');
            window.location.reload();
          });
        })
        .catch((error) => {
          console.error('[SW] Service Worker registration failed:', error);
        });
    }
  }, []);

  // Function to skip waiting and activate new service worker
  const skipWaiting = () => {
    if (state.waiting) {
      state.waiting.postMessage({ type: 'SKIP_WAITING' });
      console.log('[SW] Sent SKIP_WAITING message');
    }
  };

  return {
    registration: state.registration,
    updateAvailable: state.updateAvailable,
    skipWaiting,
  };
}
