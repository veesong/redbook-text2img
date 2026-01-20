/**
 * Test script to verify basePath configuration
 * Run with: pnpm tsx scripts/test-basepath.ts
 */

import { withBasePath, BASE_PATH } from '../src/lib/config';

console.log('='.repeat(60));
console.log('BasePath Configuration Test');
console.log('='.repeat(60));
console.log('');

console.log('Current Configuration:');
console.log(`  NEXT_PUBLIC_BASE_PATH: ${process.env.NEXT_PUBLIC_BASE_PATH || '(not set)'}`);
console.log(`  BASE_PATH (from config): ${BASE_PATH}`);
console.log('');

console.log('Path Generation Tests:');
const testPaths = [
  '/icon-512.png',
  '/og.png',
  '/manifest.webmanifest',
  '/offline/',
];

testPaths.forEach((path) => {
  const result = withBasePath(path);
  console.log(`  ${path.padEnd(25)} → ${result}`);
});

console.log('');
console.log('✅ All paths generated successfully!');
console.log('');

if (BASE_PATH === '/redbook-text2img') {
  console.log('📝 Current config: GitHub Pages deployment');
  console.log('   To deploy to root path, set: NEXT_PUBLIC_BASE_PATH=');
} else if (BASE_PATH === '' || BASE_PATH === '/') {
  console.log('📝 Current config: Root path deployment (Vercel/Netlify)');
  console.log('   To deploy to GitHub Pages, set: NEXT_PUBLIC_BASE_PATH=/redbook-text2img');
} else {
  console.log(`📝 Current config: Custom path deployment (${BASE_PATH})`);
}
console.log('');
console.log('='.repeat(60));
