/** @type {import('next').NextConfig} */
const nextConfig = {
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
