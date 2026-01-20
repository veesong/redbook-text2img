# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **小红书图片生成器** (RedBook Text2Img) - a Next.js web application that converts Markdown content into styled images optimized for sharing on Xiaohongshu (Little Red Book) social media platform.

**Tech Stack:**
- Next.js 16.1.1 with App Router
- React 19.2.3 with React Compiler enabled
- TypeScript (strict mode)
- Tailwind CSS 4.1.11
- Zustand 5.0.6 for state management
- Radix UI primitives + shadcn/ui components
- CodeMirror 6 for Markdown editing
- html2canvas-pro for image export
- pnpm as package manager

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint and fix code
pnpm lint                # Run ultracite linter
npx ultracite fix        # Auto-fix issues
npx ultracite format     # Format code

# Type checking
npx tsc --noEmit         # Type check without emitting files
```

## Code Quality Tools

- **ultracite** (v7.0.8) - All-in-one linter and formatter (replaces ESLint/Prettier)
- **Biome** (v2.3.11) - Fast linter and formatter configuration in `biome.jsonc`
- **lint-staged** - Pre-commit hooks run `ultracite format` and `ultracite fix` on staged files
- Pre-commit hooks are configured for: `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.jsonc`, `.css`, `.scss`, `.md`, `.mdx`

## Architecture

### Feature-Based Structure

```
src/
├── app/                    # Next.js App Router (pages, layouts, API routes)
│   ├── page.tsx           # Main page with three-column layout
│   ├── layout.tsx         # Root layout with providers
│   ├── changelog/         # Changelog page
│   └── faq/               # FAQ page
├── components/            # React components
│   ├── ui/               # shadcn/ui base components (button, card, input, select, etc.)
│   ├── easy/             # Wrapped components
│   ├── enhance/          # Enhanced components
│   ├── header.tsx        # Application header
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx   # Dark/light mode switcher
├── features/             # Feature-based modules
│   ├── configurator/     # Style configuration panel
│   ├── editor/           # Markdown editor with CodeMirror
│   └── preview/          # Image preview and export (with hooks/)
├── lib/                  # Core utilities and business logic
│   ├── image-style-config.ts  # Style type definitions
│   ├── style-generator.ts     # Dynamic CSS style generation
│   ├── markdown-parser.ts    # Markdown parsing and segmentation
│   ├── preset-config.ts       # Style preset management
│   ├── default-styles.ts      # Default style configurations
│   └── utils.ts               # Utility functions
└── store/                # Zustand state stores
    ├── markdownContent.ts  # Markdown content state with change tracking
    ├── styleConfig.ts       # Style configuration state
    └── theme.ts             # Dark/light theme state
```

### Key Architectural Patterns

**Three-Column Layout:**
- **Left**: Markdown editor (CodeMirror with GitHub theme)
- **Center**: Real-time image preview
- **Right**: Style configurator (customizable options)

**State Management:**
- Zustand stores with `devtools` and `persist` middleware
- localStorage persistence for user preferences and content
- Three main stores: `markdownContent`, `styleConfig`, `theme`

**Markdown Processing Pipeline:**
1. User inputs Markdown in editor
2. `markdown-parser.ts` splits content by `---` separators into segments
3. Each segment becomes a separate image
4. `style-generator.ts` generates CSS based on style configuration
5. Preview component renders styled HTML
6. html2canvas-pro exports DOM to PNG images (3x scale for high quality)

**Styling System:**
- Tailwind CSS 4 utility classes for UI
- CSS-in-JS for dynamic image styles (via `style-generator.ts`)
- Type-safe style configuration with TypeScript interfaces
- Preset-based styling with customization options
- Dark mode support via CSS variables

## Component Conventions

**File Naming:**
- Components: kebab-case (e.g., `markdown-editor.tsx`)
- Hooks: kebab-case with `use-` prefix (e.g., `use-image-export.ts`)
- Utilities: kebab-case (e.g., `style-generator.ts`)
- Stores: camelCase (e.g., `markdownContent.ts`)

**Component Structure:**
```typescript
'use client'; // Required for interactive components

import { memo } from 'react';

interface ComponentProps {
  // prop definitions
}

export const Component = memo(({ ... }: ComponentProps) => {
  // component logic
  return (
    // JSX
  );
});

Component.displayName = 'Component';
```

**Key Points:**
- Use `'use client'` directive for client components (most components)
- Use `React.memo` for performance optimization on frequently rendered components
- Use `forwardRef` when components need ref access (e.g., for image export)
- Set `displayName` on exported components
- Use `class-variance-authority` (cva) for component variants

## Important Configuration Files

- `next.config.ts` - Next.js config (React Compiler enabled, images unoptimized for static export)
- `tsconfig.json` - TypeScript strict mode with path aliases (`@/*` → `src/*`)
- `postcss.config.mjs` - Tailwind CSS 4 PostCSS plugin
- `biome.jsonc` - Code formatting rules (extends ultracite)
- `components.json` - shadcn/ui component configuration
- `package.json` - Uses pnpm@10.13.1 with lint-staged configuration

## Core Libraries

- **@codemirror/lang-markdown** + **@uiw/react-codemirror** - Markdown editor with GitHub theme
- **react-markdown** + **markdown-to-jsx** - Markdown rendering
- **html2canvas-pro** - DOM to canvas conversion (scale: 3, useCORS: true)
- **@radix-ui/react-*** - Accessible UI primitives (Select, Separator, Tooltip, Label, Slot)
- **lucide-react** - Icon library
- **class-variance-authority** + **clsx** + **tailwind-merge** - Component variant management

## State Management Pattern

Zustand stores follow this pattern:
```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface State {
  value: string;
  setValue: (value: string) => void;
}

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        value: '',
        setValue: (value) => set({ value }),
      }),
      { name: 'store-name' }
    )
  )
);
```

## Styling Guidelines

- **UI Components**: Use Tailwind utility classes
- **Dynamic Styles**: Use CSS-in-JS with `React.CSSProperties` type
- **Style Generation**: Centralized in `lib/style-generator.ts`
- **Units**: Use `em`/`rem` for relative units, not `px`
- **Dark Mode**: Consider dark mode support for all new UI components

## Export Functionality

The image export system uses html2canvas-pro with these key configurations:
- **Scale**: 3x for high-quality output
- **backgroundColor**: Configurable via style settings
- **useCORS**: true for cross-origin images
- **allowTaint**: false for security
- **Logging**: false

Export is handled by hooks in `src/features/preview/hooks/` and requires refs to DOM elements.

## Performance Optimizations

- **React Compiler**: Enabled for automatic optimizations
- **React.memo**: Used on components that re-render frequently
- **useMemo/useCallback**: Used for expensive computations and event handlers
- **Code Splitting**: Lazy loading for non-critical features

## Testing

**No testing framework is currently configured.** The project lacks:
- Test scripts in package.json
- Testing dependencies (Jest, Vitest, Testing Library)
- Test files

When adding tests, consider using Vitest + Testing Library for consistency with the modern stack.

## Special Notes

- **Markdown Segmentation**: Content separated by `---` creates multiple images
- **Filename Generation**: Based on content titles (first heading or content)
- **Batch Export**: Supports exporting all segments at once
- **PWA Support**: Manifest configured for mobile installation
- **SEO Optimized**: Includes structured data, sitemap, robots.txt
- **Analytics**: Vercel Analytics integrated
- **Chinese Interface**: Application UI is in Chinese

## Common Tasks

**Adding a New Style Preset:**
1. Define style type in `lib/image-style-config.ts`
2. Add preset configuration in `lib/default-styles.ts`
3. Update preset utilities in `lib/preset-config.ts`
4. Style generation is automatic in `lib/style-generator.ts`

**Creating a New UI Component:**
1. Check if shadcn/ui component exists in `components/ui/`
2. If creating custom component, use the component structure template
3. Use `class-variance-authority` for variants
4. Add `displayName` for debugging

**Working with Stores:**
1. Import store hook: `import { useXxxStore } from '@/store/xxx'`
2. Use selectors: `const value = useXxxStore((state) => state.value)`
3. Use actions: `const setValue = useXxxStore((state) => state.setValue)`
4. DevTools integration is automatic

**Image Export Debugging:**
- Check DOM structure is renderable by html2canvas
- Verify CORS settings for external images
- Ensure ref is properly attached to preview element
- Check style generation in `style-generator.ts`
