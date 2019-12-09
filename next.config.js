const withCSS = require("@zeit/next-css");
require("dotenv").config();

module.exports = withCSS({
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });

    return config;
  },
  env: {
    DOMAIN: process.env.DOMAIN
  }
});
