import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/fix11y' : '',
  assetPrefix: isProd ? '/fix11y/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;