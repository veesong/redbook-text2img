'use client';

import { useEffect, useState } from 'react';
import { usePWAInstallStore } from '@/store/pwaInstall';

export function usePWAInstall() {
  const { deferredPrompt, setDeferredPrompt, shouldShowPrompt, dismissForTime } =
    usePWAInstallStore();
  const [canInstall, setCanInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' &&
        (navigator as any).standalone !== undefined);

    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setCanInstall(true);
      console.log('[PWA] beforeinstallprompt event fired');
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      setCanInstall(false);
      console.log('[PWA] PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already installed (running in standalone mode)
    const isStandalone =
      (window.matchMedia('(display-mode: standalone)').matches &&
        !isIOSDevice) ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      setCanInstall(false);
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [setDeferredPrompt]);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      console.log('[PWA] No deferred prompt available');
      return;
    }

    // Show the install prompt
    (deferredPrompt as any).prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await (deferredPrompt as any).userChoice;

    console.log(`[PWA] User response to install prompt: ${outcome}`);

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setCanInstall(false);
  };

  const dismissPrompt = (duration = 7 * 24 * 60 * 60 * 1000) => {
    // Default: dismiss for 7 days
    dismissForTime(duration);
    setCanInstall(false);
  };

  return {
    canInstall: canInstall && shouldShowPrompt() && !deferredPrompt,
    isIOS,
    promptInstall,
    dismissPrompt,
  };
}
