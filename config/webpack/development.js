process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

environment.loaders.append('eslint', {
  enforce: 'pre',
  test: /\.(js|jsx)$/i,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    failOnError: process.env.NODE_ENV !== 'production'
  }
})

module.exports = environment.toWebpackConfig()
