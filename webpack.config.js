const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  target: "webworker",
  devtool: 'cheap-module-source-map',
  mode: 'development',
  resolve: {
    // fallback: {
    //   fs: false,
    //   path: false,
    //   http: false,
    //   https: false,
    //   url: false,
    //   querystring: false,
    //   zlib: false,
    //   util: false,
    //   stream: false,
    //   assert: false,
      

    // },
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': 'BROWSER'
    })
  ]
}
