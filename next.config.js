module.exports = {
  distDir: 'build',
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  webpack: function (config, options) {
    config.experiments = {};
    return config;
  },
};
