/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  serverComponentsExternalPackages: ["mongoose"], // <-- and this
};

module.exports = nextConfig;
