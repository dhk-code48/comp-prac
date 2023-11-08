/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    CLIENT_URL: process.env.CLIENT_URL,
  },
  serverComponentsExternalPackages: ["mongoose"], // <-- and this
};

module.exports = nextConfig;
