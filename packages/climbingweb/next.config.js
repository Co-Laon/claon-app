/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com','*']
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'src'],
  },
};

module.exports = nextConfig;
