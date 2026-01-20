/**
 * Global configuration for the application
 * This file centralizes configuration values that need to be shared across the app
 */

// Base path configuration for GitHub Pages deployment
// This should match the basePath in next.config.ts
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/redbook-text2img';

// Helper function to get full path with basePath
export function withBasePath(path: string): string {
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure basePath doesn't end with slash unless it's root
  const basePath = BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH;
  return `${basePath}/${cleanPath}`;
}

// Helper function to get base URL for API calls or external links
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // In browser, use the origin
    return window.location.origin;
  }
  // In server, use environment variable or default
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://redbook-text2img.vercel.app';
}
