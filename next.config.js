/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const { parsed: myEnv, error: envError } = require('dotenv').config()

const nextConfig = {
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
        return config
    }
}

module.exports = nextConfig
