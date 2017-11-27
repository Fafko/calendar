const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "css/app.css"
});

const copyStatic = new CopyWebpackPlugin([
  {from: './src/manifest.json', to: './manifest.json'}
]);

const indexHtml = new HtmlWebpackPlugin({
  template: './src/index.html',
  excludeChunks: ['sw']
});

const environment = new webpack.EnvironmentPlugin({
  NODE_ENV: JSON.stringify(process.env.NODE_ENV)
});

module.exports = {

  entry: {
    'js/app': './src/js/app.js',
    'sw': './src/js/sw.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }]
        })
      }
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    contentBase: path.join(__dirname, 'build')
  },
  context: path.join(__dirname, '/'),
  plugins: [
    environment,
    indexHtml,
    copyStatic,
    extractLess
  ]

};