import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      //字体
      'juejin-font-1': '#252933',
      'juejin-font-2': '#515767',
      'juejin-font-3': '#8a919f',
      'juejin-font-4': '#c2c8d1',
      'juejin-font-primary':'#1d2129',
      //按钮相关
      'juejin-brand-1-normal': '#1e80ff',
      'juejin-brand-2-hover': '#1171ee',
      'juejin-brand-3-click': '#0060dd',
      'juejin-brand-4-disable': '#abcdff',
      'juejin-brand-5-light': '#eaf2ff',
      //蒙层
      'juejin-mask-1': 'rgba(0,0,0,0.4)',
      'juejin-mask-2': '#fff',
      //布局块的背景
      'juejin-layer-1': '#fff',
      'juejin-layer-2-1': '#f7f8fa',
      'juejin-layer-2-2':'rgba(247,248,250,0.7)',
      'juejin-bg': '#f2f3f5',
      //gray
      'juejin-gray-0': '#fff',
      'juejin-gray-1-1': '#e4e6eb',
      'juejin-gray-1-2': 'rgba(228, 230, 235, 0.5)',
      'juejin-gray-1-3': '#e4e6eb',
      'juejin-gray-2': '#f2f3f5',
      'juejin-gray-3': '#f7f8fa',
      //other
      'juejin-nav-title': '#86909c',
      'juejin-comment-bg': 'rgba(244, 245, 245, 0.5)',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      'sm':'640px',
      'md':'798px',
      'lg': '1148px',
    }
  },
  plugins: [],
}
export default config
