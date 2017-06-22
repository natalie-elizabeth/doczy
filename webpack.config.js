const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
let config = {};

const NODE_ENV = process.env.NODE_ENV;
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

module.exports = {
  entry: [
    //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'client/src/index.js')
  ],
  target: 'web',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './client/src',
    historyApiFallback: true,
    host: HOST,
    port: PORT,
    publicPath: '/',
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
    },
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/src/index.html'
    }),
    // new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, include: path.join(__dirname, 'client/src'), loaders: ['babel-loader'] },
      { test: /\.(css)$|scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  }
};
