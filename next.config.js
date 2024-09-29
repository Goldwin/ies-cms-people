/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const { parsed: myEnv, error: envError } = require("dotenv").config();

const nextConfig = {
  env: {
    AUTH_URL: process.env.AUTH_URL,
    PEOPLE_URL: process.env.PEOPLE_URL,
    APP_URL: process.env.APP_URL,
    ATTENDANCE_URL: process.env.ATTENDANCE_URL,
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
  output: "standalone",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
