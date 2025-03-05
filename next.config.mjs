/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: "experimental-edge", // ✅ Enables Edge runtime for Cloudflare Pages
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resom-api.resom.com.br",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "public-media.resom.com.br",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
