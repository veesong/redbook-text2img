import type { StyleConfig } from './image-style-config';
import {
  Background,
  FontColor,
  FontSize,
  Horizontal,
  Vertical,
} from './preset-config';

export const defaultStyles: StyleConfig[] = [
  {
    id: 'built-in-minimal',
    name: '基础风格',
    content: {
      size: FontSize.md,
      titleColor: FontColor.black,
      contentColor: FontColor.black,
      background: Background.gray,
      vertical: Vertical.top,
      horizontal: Horizontal.left,
    },
    cover: {},
  },
  {
    id: 'built-in-simple',
    name: '简约风格',
    content: {
      size: FontSize.md,
      titleColor: FontColor.black,
      contentColor: FontColor.black,
      background: Background.TrianglifyGary,
      vertical: Vertical.top,
      horizontal: Horizontal.left,
    },
    cover: {},
  },
  {
    id: 'built-in-warm',
    name: '温暖风格',
    content: {
      size: FontSize.md,
      titleColor: FontColor.orange,
      contentColor: FontColor.black,
      background: Background.linearGradient1,
      vertical: Vertical.top,
      horizontal: Horizontal.left,
    },
    cover: {},
  },
  {
    id: 'built-in-tech',
    name: '科技风格',
    content: {
      size: FontSize.md,
      titleColor: FontColor.blue,
      contentColor: FontColor.white,
      background: Background.linearGradient2,
      vertical: Vertical.top,
      horizontal: Horizontal.left,
    },
    cover: {},
  },
  {
    id: 'built-in-purple-pink',
    name: '紫粉渐变',
    content: {
      size: FontSize.md,
      titleColor: '#4c1d95',
      contentColor: '#1e1b4b',
      background: Background.gradientPurplePink,
      vertical: Vertical.top,
      horizontal: Horizontal.left,
    },
    cover: {},
  },
  {
    id: 'built-in-warm-sunset',
    name: '粉黄暖阳',
    content: {
      size: FontSize.md,
      titleColor: '#be123c',
      contentColor: '#881337',
      background: Background.gradientWarmSunset,
      vertical: Vertical.top,
      horizontal: Horizontal.left,
    },
    cover: {},
  },
  {
    id: 'built-in-fresh-green',
    name: '清新翠绿',
    content: {
      size: FontSize.md,
      titleColor: '#166534',
      contentColor: '#14532d',
      background: Background.gradientFreshGreen,
      vertical: Vertical.top,
      horizontal: Horizontal.left,
    },
    cover: {},
  },
  {
    id: 'built-in-elegant-fresh',
    name: '淡雅清爽',
    content: {
      size: FontSize.md,
      titleColor: '#475569',
      contentColor: '#1e293b',
      background: Background.gradientElegantFresh,
      vertical: Vertical.top,
      horizontal: Horizontal.left,
    },
    cover: {},
  },
  {
    id: 'built-in-dreamy-purple',
    name: '梦幻紫蓝',
    content: {
      size: FontSize.md,
      titleColor: '#4338ca',
      contentColor: '#1e1b4b',
      background: Background.gradientDreamyPurple,
      vertical: Vertical.top,
      horizontal: Horizontal.left,
    },
    cover: {},
  },
  {
    id: 'built-in-minimalist-gray',
    name: '简约灰调',
    content: {
      size: FontSize.md,
      titleColor: '#374151',
      contentColor: '#111827',
      background: Background.gradientMinimalistGray,
      vertical: Vertical.top,
      horizontal: Horizontal.left,
    },
    cover: {},
  },
];

export const defaultStyleIds = defaultStyles.map((style) => style.id);
