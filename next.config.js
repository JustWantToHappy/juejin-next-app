const nextConfig = {
	experimental: {
		appDir: false, //不设置app为默认路由系统
	},
	distDir: "build", //next打包后生成的路径，默认是.next
	//浏览器与node环境下都可以访问
	publicRuntimeConfig: {
		NODE_ENV_API: process.env.NODE_ENV,
	},
	async rewrites() {
		return [
			{
				source: "/following",
				destination: "/",
			},
			{
				source: "/recommended",
				destination: "/",
			},
			{
				source: "/backend",
				destination: "/",
			},
			{
				source: "/frontend",
				destination: "/",
			},
			{
				source: "/andriod",
				destination: "/",
			},
			{
				source: "/ios",
				destination: "/",
			},
			{
				source: "/ai",
				destination: "/",
			},
			{
				source: "/freebie",
				destination: "/",
			},
			{
				source: "/career",
				destination: "/",
			},
			{
				source: "/article",
				destination: "/",
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: "api.paugram.com",
			},
		],
	},
};

module.exports = nextConfig;
