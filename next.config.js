/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'uploadthing.com', 'utfs.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig