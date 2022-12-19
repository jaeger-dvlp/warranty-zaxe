/** @type {import('next').NextConfig} */
const path = require('path');
const { i18n } = require('./next-i18next.config');

const { APIURL } = process.env;

const nextConfig = {
  reactStrictMode: true,
  i18n,
  env: {
    APIURL,
  },
  webpack: (config, { isServer }) => {
    const customConfig = config;
    const prefix = config.assetPrefix ?? config.basePath ?? '';
    customConfig.optimization.providedExports = true;
    customConfig.plugins = config.plugins || [];
    customConfig.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    };
    customConfig.module.rules.push({
      test: /\.(webm|mp4|stl|txt)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: `${prefix}/_next/static/media/`,
            outputPath: `${isServer ? '../' : ''}static/media/`,
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });

    return customConfig;
  },
};

module.exports = nextConfig;
