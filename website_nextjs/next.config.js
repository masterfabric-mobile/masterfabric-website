/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // Basitleştirilmiş webpack konfigürasyonu
  webpack: (config, { isServer }) => {
    // CSS modülleri için basit ayarlar
    if (!isServer) {
      // MiniCssExtractPlugin'i ekle
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        })
      );
    }

    // CSS dosyalarını işlemek için kurallar
    const cssRules = config.module.rules.find(rule => typeof rule.oneOf === 'object');
    
    if (cssRules) {
      // CSS modüllerini etkinleştir
      const moduleSassRule = cssRules.oneOf.find(
        rule => rule.test && rule.test.toString().includes('module')
      );
      
      if (moduleSassRule) {
        const cssLoader = moduleSassRule.use.find(
          ({ loader }) => loader && loader.includes('css-loader')
        );
        
        if (cssLoader) {
          cssLoader.options.modules = {
            ...cssLoader.options.modules,
            exportLocalsConvention: 'camelCase',
          };
        }
      }
    }
    
    return config;
  }
}

module.exports = nextConfig
