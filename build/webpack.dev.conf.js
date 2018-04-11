'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const autoprefixer = require('autoprefixer');
const px2viewport = require('postcss-px-to-viewport');
const aspectRatio = require('postcss-aspect-ratio-mini');
const writeSvg = require('postcss-write-svg');

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const compileConfigs = require('../src/web/pages/compile.config.json');
let htmls = utils.htmls;
console.log(htmls);
const getHtmlTplDev = ()=>{
  var result = [];
  for(let name in htmls){
    var compileConfig = compileConfigs[name];
    var conf = {
      title : compileConfig.title,
      filename: [name]+'.html',
      template: htmls[name],
      alwaysWriteToDisk: true,
      inject: true,
      chunks : [name],
      complieConfig:{
        scripts : compileConfig.devDependencies,
        title : compileConfig.title,
        styles : compileConfig.styles,
        cdn : compileConfig.cdn,
      }
    };
    result.push(new HtmlWebpackPlugin(conf))
  }
  return result;
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // rules: utils.styleLoaders({ 
    //   sourceMap: config.dev.cssSourceMap, 
    //   usePostCSS: true 
    // })
    rules:[{
      test: /\.(styl|css)/,
      exclude: /node_modules/,
      use: ['style-loader','css-loader', 'postcss-loader', 'stylus-loader']
    }]
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
    //   ],
    // },
    historyApiFallback:true,
    hot: false,
    contentBase: path.resolve(__dirname, '../'),
    // contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   favicon:'src/assets/favicon.ico',
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    ...getHtmlTplDev(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // new HtmlWebpackHarddiskPlugin(),
    //   new BrowserSyncPlugin({
    //   host: 'localhost',
    //   port: 3000,
    //   proxy: 'http://localhost:9988/'
    // })

    
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
