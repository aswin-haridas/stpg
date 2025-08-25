/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'preact/jsx-runtime': 'react/jsx-runtime',
    };
    return config;
  },
}

module.exports = nextConfig