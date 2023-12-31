const nextConfig = {
  experimental: {
    appDir: false, //不设置app为默认路由系统
  },
  async rewrites() {
    return [
      {
        source: '/following',
        destination: '/'
      },
      {
        source: '/recommended',
        destination: '/'
      },
      {
        source: '/backend',
        destination: '/'
      },
      {
        source: '/frontend',
        destination: '/'
      },
      {
        source: '/andriod',
        destination: '/'
      },
      {
        source: '/ios',
        destination: '/'
      },
      {
        source: '/ai',
        destination: '/'
      },
      {
        source: '/freebie',
        destination: '/'
      },
      {
        source: '/career',
        destination: '/'
      },
      {
        source: '/article',
        destination: '/'
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname:'www.dmoe.cc'
      }
    ],
  },
}

module.exports = nextConfig
