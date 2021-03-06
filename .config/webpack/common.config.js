const webpack = require('webpack')
const {resolve} = require('path')
const {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader')

module.exports = {
  context: resolve(__dirname, '../../workspaces'),
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '.js'],
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true,
              reportFiles: [
                "workspaces/**/*.{ts,tsx}"
              ]
            }
          },
          {
            loader: 'stylelint-custom-processor-loader',
            options: {
              configPath: './.config/stylelint.json'
            }
          }
        ]
      },
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single'
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      'process.env.SYNCANO_PROJECT_INSTANCE': JSON.stringify(
        process.env.SYNCANO_PROJECT_INSTANCE
      ),
      'process.env.SENTRY_URL': JSON.stringify(
        process.env.SENTRY_URL
      ),
      'process.env.PUBLIC_URL': JSON.stringify(
        process.env.PUBLIC_URL
      ),
      'process.env.TRACKJS_KEY': JSON.stringify(
        process.env.TRACKJS_KEY
      ),
      'process.env.LOCAL_STORAGE_KEY': JSON.stringify(
        process.env.LOCAL_STORAGE_KEY
      )
    })
  ]
}
