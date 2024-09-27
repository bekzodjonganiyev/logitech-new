/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.logitech.uz',
            // hostname: 'cdn.mediapark.uz',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'backend.tkti.uz',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 's3-alpha-sig.figma.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;
