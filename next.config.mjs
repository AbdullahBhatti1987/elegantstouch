/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  allowedDevOrigins: ['192.168.100.12', '10.233.4.208', 'localhost'],

  reactStrictMode: false,
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'bachaaparty.com',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
