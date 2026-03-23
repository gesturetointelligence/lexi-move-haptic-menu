/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  output: 'export',
  basePath: isPages ? '/lexi-move-haptic-menu' : '',
  assetPrefix: isPages ? '/lexi-move-haptic-menu' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
