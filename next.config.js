module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  webpack: function (config, options) {
    config.experiments = {};
    return config;
  },
};
