import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'i.namu.wiki',
      'via.placeholder.com',
      'ugc-images.catchtable.co.kr',
      'images.unsplash.com',
      'd2ba33ltwyhxsm.cloudfront.net'
    ]
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}

export default nextConfig
