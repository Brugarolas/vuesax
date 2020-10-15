const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [{
        test: /\.styl$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'stylus-loader' }
        ]
      }],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/styles',
            to: 'styles/',
            toType: 'dir'
          }
        ]
      })
    ]
  }
}
