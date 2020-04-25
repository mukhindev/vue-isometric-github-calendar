const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const openInEditor = require('launch-editor-middleware')

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 8080,
    historyApiFallback: true,
    before (app) {
      app.use('/__open-in-editor', openInEditor())
    }
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyPlugin([
      {
        from: './public',
        ignore: ['*.pug'],
      },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.pug'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
        exclude: /node_modules|public/
      },
      { 
        test: /\.pug$/, 
        loader: 'pug-loader',
        exclude: /node_modules|src/
      },
      { 
        test: /\.graphql$/, 
        loader: 'raw-loader',
        exclude: /node_modules/
      }
    ]
  }
}
