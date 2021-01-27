const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
    mode: 'production',
    entry: "./assets/js/app.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./js/bundle.js"
    },
    module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
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
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
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
        }
      ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: './css/bundle.css',
        }),
      ]
  }
  
  module.exports = config;
