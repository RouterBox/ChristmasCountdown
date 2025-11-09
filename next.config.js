/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.leonardo.ai'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.leonardo.ai',
      },
    ],
  },
}

module.exports = nextConfig

