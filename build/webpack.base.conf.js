var path = require('path')
var glob = require('glob'); // glob模块，用于读取webpack入口目录文件
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var node_modules_dir = path.join(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var deps = [
  'jquery/dist/jquery.min.js',
    'jquery/dist/jquery.js',
];

var getEntry = function() { 
var entry = {}; //读取开发目录,并进行路径裁剪 
glob.sync('./src/**/*.js') .forEach(function(name) { var start = name.indexOf('src/') + 4, end = name.length - 3;
 var n = name.slice(start, end); n = n.slice(0, n.lastIndexOf('/')); 

 //保存各个组件的入口
  entry[n] = name; }); return entry; };


module.exports = {
  entry: 
  {
    app: './src/main.js',
     vendors: ['vue','jquery','moment','jqueryui','photoswipe','src/lib/photoswipe/photoswipe-ui-default.js']
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
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
  
    loaders: [
      {
        test: require.resolve('vue'), 
        loader: 'expose?Vue!'  
      },
      {
        test:  require.resolve('jquery'), 
        loader: 'expose?$!expose?jQuery!'  
      },
      {
        test:  require.resolve('moment'), 
        loader: 'expose?moment!'  
      },
      {
        test:  require.resolve('jqueryui'), 
        loader: 'expose?jqueryui!'  
      },
      {
        test: require.resolve('photoswipe'), 
        loader: 'expose?PhotoSwipe!'  
      },
      {
        test: require.resolve('../src/lib/datepicker/scripts/datepicker'), 
        loader: 'expose?CarouselDatepicker!'  
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
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
