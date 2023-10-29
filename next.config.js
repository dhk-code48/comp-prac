/** @type {import('next').NextConfig} */
const nextConfig = {
  serverComponentsExternalPackages: ["mongoose"], // <-- and this
};

module.exports = nextConfig;
