// next.config.js
const withCSS = require('@zeit/next-css');

const nextConfig = {
  webpack(config, options) {
    return config;
  },
};

module.exports = withCSS(nextConfig);