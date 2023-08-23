const nextConfig = {
  experimental: {
    appDir: false, //设置app为默认路由系统
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'rzl96k3z6.hn-bkt.clouddn.com',
      },
    ],
  },
}

module.exports = nextConfig
