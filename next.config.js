/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  images: {
    remotePatterns: [
      {
        hostname: 'loremflickr.com',
      },
    ],
  },
}

module.exports = nextConfig
