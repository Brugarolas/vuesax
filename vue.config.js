const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [{
        test: /\.styl$/,
        use: [
          { loader: 'css-loader' },
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'stylus-loader',
            options: {
              webpackImporter: true
            }
          }
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
