/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com','*', 'bunny.jjalbot.com']
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'src'],
  },
};

module.exports = nextConfig;
