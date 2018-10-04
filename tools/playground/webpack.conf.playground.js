const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    vue: resolve('./playground.vue.js'),
    react: resolve('./playground.react.js')
  },
  output: {
    path: resolve('./dev'),
    filename: '[name].js'
  },
  devtool: 'none',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'vue.html',
      template: resolve('./playground.html'),
      variables: {
        ID: 'Vue'
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'react.html',
      template: resolve('./playground.html'),
      variables: {
        ID: 'React'
      }
    }),
    new webpack.DefinePlugin({
      THEME: JSON.stringify('default')
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.react.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.vue\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.sass', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
      themes: resolve('./themes')
    }
  }
}
