const path = require('path');
const UglifyJS = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const env = process.env.NODE_ENV || "local";

module.exports = {
  entry: {
    app: [
      "babel-polyfill",
      path.resolve(__dirname, "app/index.js")
    ]
  },
  mode: "development",
  // devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'public/build/'),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/build/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        } 
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.styl?$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[local]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer'),
                ],
                sourceMap: true
              },
            },
            {
              loader: 'stylus-loader',
              options: {
                'include css': true,
                preferPathResolver: 'webpack',
              },
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
  watch: env == "local"
};