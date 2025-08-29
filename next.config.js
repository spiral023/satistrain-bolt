/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable image optimization for better performance
  images: { 
    unoptimized: false,
    domains: ['satistrain-bolt.netlify.app'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    esmExternals: false,
    optimizeCss: true, // Enable CSS optimization
  },
  // Optimize webpack bundle
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Bundle analyzer in development
    if (process.env.ANALYZE === 'true' && !dev) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './bundle-analysis.html',
          openAnalyzer: false,
        })
      );
    }

    // Optimize chunk splitting for better caching
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
            // Separate Radix UI components
            radix: {
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              name: 'radix',
              priority: 20,
              reuseExistingChunk: true,
            },
            // Separate Supabase
            supabase: {
              test: /[\\/]node_modules[\\/]@supabase[\\/]/,
              name: 'supabase',
              priority: 15,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },
};

module.exports = nextConfig;
