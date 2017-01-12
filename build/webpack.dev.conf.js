var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: true  })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.ProvidePlugin({
        "$": "jquery",
        "jQuery": "jquery",
         "Vue": "vue",
          "moment": "moment",
          "PhotoSwipe":"photoswipe",
          "CarouselDatepicker":"src/lib/datepicker/scripts/datepicker",
          "SopNative":"src/page/sopnative",
          "UtilHelper":"src/utils/utilhelper"
    }),


    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new ExtractTextPlugin("static/[name].css"),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
    ,


  ]
})
