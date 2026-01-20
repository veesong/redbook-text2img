// Service Worker for RedBook Text2Img PWA
// Simple implementation without external dependencies

const CACHE_VERSION = 'v1';
const CACHE_NAME = `redbook-text2img-${CACHE_VERSION}`;

// Assets to cache on install
const PRECACHE_ASSETS = [
  './',
  './manifest.webmanifest',
  './icon-72.png',
  './icon-96.png',
  './icon-128.png',
  './icon-192.png',
  './icon-256.png',
  './icon-384.png',
  './icon-512.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching assets');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );

  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('redbook-text2img-') && name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );

  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different resource types with appropriate strategies
  if (request.destination === 'document') {
    // HTML pages: NetworkFirst with offline fallback
    event.respondWith(networkFirst(request));
  } else if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.url.includes('.png') ||
    request.url.includes('.jpg') ||
    request.url.includes('.jpeg') ||
    request.url.includes('.svg') ||
    request.url.includes('.webp') ||
    request.url.includes('.woff') ||
    request.url.includes('.woff2') ||
    request.url.includes('.ttf') ||
    request.url.includes('.eot')
  ) {
    // Static assets: CacheFirst
    event.respondWith(cacheFirst(request));
  } else {
    // Other requests: NetworkFirst
    event.respondWith(networkFirst(request));
  }
});

// NetworkFirst strategy: Try network first, fallback to cache
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    // Try network first
    const networkResponse = await fetch(request);

    // Cache the response for future use
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network request failed, trying cache:', error);

    // If network fails, try cache
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // If nothing in cache and offline page exists, return it
    const offlineResponse = await cache.match('./offline/');

    if (offlineResponse) {
      return offlineResponse;
    }

    // Fallback response
    return new Response('离线状态 - Offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain; charset=utf-8',
      }),
    });
  }
}

// CacheFirst strategy: Try cache first, fallback to network
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  // Try cache first
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  // If not in cache, fetch from network
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Asset request failed:', error);
    throw error;
  }
}

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting requested');
    self.skipWaiting();
  }
});

console.log('[SW] Service worker loaded');
