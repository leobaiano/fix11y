import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/fix11y',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;