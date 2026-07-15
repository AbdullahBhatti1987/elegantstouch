/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  allowedDevOrigins: ['192.168.100.12', 'localhost'],

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
