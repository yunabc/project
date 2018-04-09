//process.traceDeprecation = true;
const path = require('path');
const autoprefixer = require('autoprefixer');
const px2viewport = require('postcss-px-to-viewport');
const aspectRatio = require('postcss-aspect-ratio-mini');
const writeSvg = require('postcss-write-svg');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const getEntry =  require('./getEntry.js')
const compileConfigs = require('../src/web/pages/compile.config.json');

const merge = require('webpack-merge');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DefinePlugin = require('webpack/lib/DefinePlugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')



var htmls = getEntry('./src/web/pages/**/*.pug');
var entrys = getEntry('./src/web/pages/**/*.js');
Object.keys(entrys).forEach(function (name) {
  entrys[name] = path.join(__dirname,'..',entrys[name]);
})
// console.log('htmls:');
// console.log(htmls);
// console.log('entrys:');
// console.log(entrys);
const getHtmlTplDev = ()=>{
  var result = [];
  for(let name in htmls){
    var compileConfig = compileConfigs[name];
    var conf = {
      title : compileConfig.title,
      filename: [name]+'.html',
      template: htmls[name],
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
const getHtmlTpl = ()=>{
  var result = [];
  for(let name in htmls){
    var compileConfig = compileConfigs[name];
    var conf = {
      title : compileConfig.title,
      filename: [name]+'.html',
      template: htmls[name],
      inject: true,
      chunks : [name,'manifest','vendor'],
      minify : {
        removeComments: true,
        collapseWhitespace: false
      },
      complieConfig:{
        scripts : compileConfig.dependencies,
        title : compileConfig.title,
        styles : compileConfig.styles,
        cdn : compileConfig.cdn,
      }
    };
    result.push(new HtmlWebpackPlugin(conf))
  }
  return result;
}

// VARS
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';

const HOST = 'localhost';
const PORT = '9988';

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// LOADERS
const rules = {
  js: {
    test: /\.js?$/,
    use: ['babel-loader'] ,
    exclude: /node_modules/,
  },
  html: {
    test: /\.pug$/,
    use: ['pug-loader'] ,
    exclude: /node_modules/
  },
  css: {
    test: /\.(styl|css)/,
    exclude: /node_modules/,
    use: ['style-loader','css-loader', 'postcss-loader', 'stylus-loader']
  },
  img: {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'img/[name].[ext]'
    }
  },
  fonts: {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }, 
  json: {
    test: /\.json$/,
    use: ['json-loader'] 
  },
  zepto:{
    test:require.resolve('zepto'),
    use: ['exports-loader?window.Zepto','script-loader']
  }
  
};

// CONFIG
const config = module.exports = {};

config.resolve = {
  extensions: ['.js', '.css', '.pug', '.json'],
  mainFields: ['browser', 'module', 'main'],
  alias: {
    '@js': resolve('src/js'),
    '@css': resolve('src/css'),
    // '@img': resolve('src/js/img'),
  }
};

config.module = {
  rules: [
    rules.js,
    rules.html,
    rules.img,
    rules.fonts,
    rules.json,
    rules.zepto
  ]
};

config.plugins = [
  new ProvidePlugin({
  }),
  new LoaderOptionsPlugin({
    debug: false,
    minimize: ENV_PRODUCTION,
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
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false
        }),
        writeSvg({
          utf8: false
        }),
        aspectRatio() 
      ]
    }
  }),
  
  
  
  new HtmlWebpackHarddiskPlugin(),
    new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    proxy: 'http://localhost:9988/'
  })

];

// DEVELOPMENT or PRODUCTION
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = entrys

  config.output = {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].bundle.js'
  };

  // config.plugins.push(
  //   new CommonsChunkPlugin({
  //     children: true,
  //     async: true
  //   })
  // );
}

// DEVELOPMENT
if (ENV_DEVELOPMENT) {
  config.devtool = 'cheap-module-source-map';

  config.output.filename =  'js/[name].js';

  config.module.rules.push(rules.css);

  config.devServer = {
    contentBase: path.resolve(__dirname, '../'),
    historyApiFallback: true,
    inline: true,
    host: HOST,
    port: PORT,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  };
  config.plugins.push(
  	...getHtmlTplDev()
  )

}

// PRODUCTION 
if(ENV_PRODUCTION) {
  config.devtool = false;

  config.output.filename = 'js/[name].[chunkhash:8].js';

  config.module.rules.push({
    test: /\.(styl|css)/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      publicPath: '../',
      use: ['css-loader', 'postcss-loader', 'stylus-loader']
    })
  });

  config.plugins.push(
    new CleanWebpackPlugin(['dist/*']),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash:8].css'
    }),
    ...getHtmlTpl(),
    new CommonsChunkPlugin({
	    name: 'vendor',
	    minChunks: function (module, count) {
	      // any required modules inside node_modules are extracted to vendor
	      return (
	        module.resource &&
	        /\.js$/.test(module.resource) &&
	        module.resource.indexOf(
	          path.join(__dirname, '../node_modules')
	        ) === 0
	      )
	    }
	  }),
	  // extract webpack runtime and module manifest to its own file in order to
	  // prevent vendor hash from being updated whenever app bundle is updated
	  new CommonsChunkPlugin({
	    name: 'manifest',
	    chunks: ['vendor']
	  }),
    new MinifyPlugin(), 
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../log/report.html',
      openAnalyzer: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname,'../static'),
        to: '../dist/static',
        ignore: ['.*']
      }
    ])
  );
}
