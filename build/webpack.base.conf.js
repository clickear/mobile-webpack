var path = require('path')
var glob = require('glob'); // glob模块，用于读取webpack入口目录文件
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var node_modules_dir = path.join(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    // 创建单据时，最先加载文件 
    app: ['./src/main.js','src/page/sopnative'],
    formoperation: ['src/common', 'components/components'],  // 常变动文件
    common: ['vue', 'jquery', 'moment', 'photoswipe', 'libjs/jquery-ui','photoswipe/dist/photoswipe-ui-default', 'src/lib/datepicker/scripts/datepicker'],  // 公共组件库，很少改动
  },

  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'libjs': path.resolve(__dirname, '../src/lib/libjs'),    
      'vue':path.resolve(__dirname,'../node_modules/vue/dist/vue.js')   
      }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [{
        test: require.resolve('vue/dist/vue'),
        loader: 'expose?Vue!'
      }, {
        test: require.resolve('jquery'),
        loader: 'expose?$!expose?jQuery!'
      }, {
        test: require.resolve('moment'),
        loader: 'expose?moment!'
      }, {
        test: require.resolve('../src/lib/libjs/jquery-ui'),
        loader: 'expose?jqueryui!'
      }, {
        test: require.resolve('photoswipe'),
        loader: 'expose?PhotoSwipe!'
      }, {
        test: require.resolve('../src/lib/datepicker/scripts/datepicker.js'),
        loader: 'expose?CarouselDatepicker!'
      }, 
      {
        test: require.resolve('../src/page/sopnative'),
        loader: 'expose?SopNative!'
      }, 
      {
        test: require.resolve('../src/utils/utilhelper'),
        loader: 'expose?UtilHelper!'
      }, 
      {
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.html$/,
        loader: 'vue-html'
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 1000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 1000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }

    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}