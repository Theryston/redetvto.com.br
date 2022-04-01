/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 60 * 60, // 1 hour
  images: {
    domains: ["onedrive.live.com"],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  strictMode: true,
};

module.exports = nextConfig;
