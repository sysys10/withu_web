import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['ugc-images.catchtable.co.kr', 'd2ba33ltwyhxsm.cloudfront.net']
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
