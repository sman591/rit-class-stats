const { environment } = require('@rails/webpacker')

environment.loaders.append('eslint', {
  enforce: 'pre',
  test: /\.js$/i,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    failOnError: process.env.NODE_ENV !== 'production'
  }
})

module.exports = environment
