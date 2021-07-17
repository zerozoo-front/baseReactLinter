const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'development';
console.log('isProduct?: ', isDevelopment);
module.exports = {
  name: 'setVersionTest',
  // mode: isDevelopment ? 'development' : 'production',
  mode: isDevelopment ? 'production' : 'development',
  devtool: isDevelopment ? 'eval' : '',
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
  entry: './client.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/index.html',
    }),
  ],
  devServer: {
    port: 9000,
    publicPath: '/dist/',
    hot: true,
  },
};
