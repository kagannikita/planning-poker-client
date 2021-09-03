module.exports = {
  distDir: 'build',
  trailingSlash: true,
  webpack: function (config, options) {
    config.experiments = {};
    return config;
  },
};
