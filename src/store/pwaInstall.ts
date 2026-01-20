import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PWAInstallState {
  // The deferred prompt from beforeinstallprompt event
  deferredPrompt: Event | null;
  // Set the deferred prompt
  setDeferredPrompt: (prompt: Event | null) => void;
  // Timestamp until which the install prompt should be hidden
  dismissUntil: number | null;
  // Dismiss the install prompt for a specified time (in milliseconds)
  dismissForTime: (ms: number) => void;
  // Check if the prompt should be shown
  shouldShowPrompt: () => boolean;
}

export const usePWAInstallStore = create<PWAInstallState>()(
  devtools(
    persist(
      (set, get) => ({
        deferredPrompt: null,
        setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt }),
        dismissUntil: null,
        dismissForTime: (ms) => {
          set({ dismissUntil: Date.now() + ms });
        },
        shouldShowPrompt: () => {
          const { dismissUntil } = get();
          if (!dismissUntil) return true;
          return Date.now() > dismissUntil;
        },
      }),
      {
        name: 'pwa-install-store',
        version: 1,
      }
    )
  )
);
