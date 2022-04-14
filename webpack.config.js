const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let config = {
  mode: 'production',
  entry: './assets/js/app.js',
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    filename: 'js/bundle.[contenthash].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(scss|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ]
    },
    {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './fonts/',
            publicPath: url => '../fonts/' + url
          }
        }
      ]
    },
    {
      test: /\.(gif|svg|jpg|png)$/,
      loader: 'file-loader',
      options: {
        outputPath: './logos/leaflet/',
        publicPath: url => '../logos/leaflet/' + url
      }
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.[contenthash].css',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/css', '**/js']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: false,
        keepClosingSlash: true,
      }
    }),
  ]
};

module.exports = config;
