import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors"; //tailwind提供的默认样式

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			...colors,
			//字体
			"juejin-font-1": "#252933",
			"juejin-font-2": "#515767",
			"juejin-font-3": "#8a919f",
			"juejin-font-4": "#c2c8d1",
			"juejin-font-primary": "#1d2129",
			//makedown相关
			"juejin-md-font": "#595959",
			"juejin-md-heading": "#135ce0",
			"juejin-md-spcial-font": " #036aca",
			"juejin-md-quote-bg": " #fff9f9",
			"juejin-md-quote-font": " #666",
			"juejin-md-quote-left": "#b2aec5",
			"juejin-md-code-bg": "#fff5f5",
			"juejin-md-code-font": "#ff502c",
			"juejin-md-pre-bg": "#f8f8f8",
			//按钮相关
			"juejin-brand-1-normal": "#1e80ff",
			"juejin-brand-2-hover": "#1171ee",
			"juejin-brand-3-click": "#0060dd",
			"juejin-brand-4-disable": "#abcdff",
			"juejin-brand-5-light": "#eaf2ff",
			"juejin-brand-6-light": "#e8f3ff",
			//蒙层
			"juejin-mask-1": "rgba(0,0,0,0.4)",
			"juejin-mask-2": "#fff",
			//布局块的背景
			"juejin-layer-1": "#fff",
			"juejin-layer-2-1": "#f7f8fa",
			"juejin-layer-2-2": "rgba(247,248,250,0.7)",
			"juejin-bg": "#f2f3f5",
			//gray
			"juejin-gray-0": "#fff",
			"juejin-gray-1-1": "#e4e6eb",
			"juejin-gray-1-2": "rgba(228, 230, 235, 0.5)",
			"juejin-gray-1-3": "#e4e6eb",
			"juejin-gray-2": "#f2f3f5",
			"juejin-gray-3": "#f7f8fa",
			//danger
			"juejin-danger-1-normal": "#f64242",
			"juejin-danger-2-deep": "#cb2634",
			"juejin-danger-3-light": "#fff2ff",
			//other
			"juejin-editor-border": "#e1e4e8",
			"juejin-nav-title": "#86909c",
			"juejin-comment-bg": "rgba(244, 245, 245, 0.5)",
			transparent: "transparent",
		},
		extend: {
			//用于覆写tailiwind内置的样式，也可以添加自定义动画，过渡效果等
			animation: {
				skeleton: "bgPos 1s linear infinite",
			},
			keyframes: {
				bgPos: {
					"0%": {
						backgroundPosition: "50% 0",
					},
					"100%": {
						backgroundPosition: "-150% 0",
					},
				},
			},
		},
		screens: {
			sm: "640px",
			md: "798px",
			lg: "1000px",
			xl: "1148px",
		},
	},
	plugins: [],
};
export default config;
