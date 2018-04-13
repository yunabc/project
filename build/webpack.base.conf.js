'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
// const vueLoaderConfig = require('./vue-loader.conf')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const aspectRatio = require('postcss-aspect-ratio-mini');
const writeSvg = require('postcss-write-svg');
const px2viewport = require('postcss-px-to-viewport');
const autoprefixer = require('autoprefixer');
let entrys = utils.entrys;
console.log(entrys);
Object.keys(entrys).forEach(function (name) {
  entrys[name] = path.join(__dirname,'..',entrys[name]);
})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


const env = require('../config/prod.env')

module.exports = {
  entry: entrys,
  context: path.resolve(__dirname, '../'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: 'chunk[id].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', 'css'],
    mainFields: ['browser', 'module', 'main'],

    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      // '@': resolve('src'),
      '@js': resolve('src/js'),
      '@css': resolve('src/css'),
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: vueLoaderConfig
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'] ,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
        }
      },
      {
        test:require.resolve('zepto'),
        use: ['exports-loader?window.Zepto','script-loader']
      }
      // {  //从这一段上面是默认的！不用改！下面是没有的需要你手动添加，相当于是编译识别sass!
      //   test: /\.scss$/,
      //   use: [
      //     { loader: 'style-loader'},
      //     { loader: 'css-loader'},
      //     { loader: 'sass-loader'}
      //   ]
      // }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins:[
    new LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      options: {
        postcss: [
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'Android 4.4',
              'ios 8',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
          px2viewport({
            viewportWidth: 750,
            viewportHeight: 1670,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: [/^body$/],
            minPixelValue: 1,
            mediaQuery: false
          }),
          writeSvg({
            utf8: false
          }),
          aspectRatio() 
        ]
      }
    })
  ]
}
