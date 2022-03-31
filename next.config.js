/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 60 * 60, // 1 hour
  images: {
    domains: ["onedrive.live.com"],
  },
};

module.exports = nextConfig;
