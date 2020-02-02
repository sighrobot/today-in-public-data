const webpack = require('webpack')
const withCSS = require('@zeit/next-css')
const withStylus = require('@zeit/next-stylus')

module.exports = withStylus(
  withCSS({
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty',
      }

      return config
    },
  })
)
