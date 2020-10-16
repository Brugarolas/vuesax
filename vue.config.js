const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
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
