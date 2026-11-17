/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { execSync } = require('child_process');
const { version: APP_VERSION } = require('./package.json');

// Short commit SHA for the footer. Vercel exposes the SHA as an env var;
// local builds fall back to git. Empty when neither is available.
function resolveCommitSha() {
  const fromEnv = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA;
  if (fromEnv) return fromEnv.slice(0, 7);
  try {
    return execSync('git rev-parse --short=7 HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return '';
  }
}

const nextConfig = {
  output: 'export',
  env: {
    NEXT_PUBLIC_APP_VERSION: APP_VERSION,
    NEXT_PUBLIC_COMMIT_SHA: resolveCommitSha(),
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
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
