'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
// const path = require('path');
const glob = require('glob');
function getFiles(sourcePath) {
  var entrys = {htmls:{},js:{}};
  var basename;
  glob.sync(sourcePath).forEach(function (filePath) {
    // console.log('filePath:');
    // console.log(filePath);
    basename = filePath.split('/').pop();
    // console.log('basename:');
    // console.log(basename);
    let allfile = glob.sync(filePath+'/*');
    let len = allfile.length;
    // console.log('allfile:');
    // console.log(allfile);
    allfile.forEach(function(entry,i){

      if(/index\.pug$/.test(entry)){

        entrys.htmls[basename] = entry;
      };
      if(/index\.js$/.test(entry)){
        entrys.js[basename] = entry;
      }
      if(i == len - 1 && !entrys.htmls[basename]){
        entrys.htmls[basename] = null
      }
    })
    // basename = path.basename(entry,path.extname(entry));
  });
  // console.log(entrys);
  return entrys;
}
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        // fallback: 'vue-style-loader'
        publicPath:'../../'
      })
    } else {
      // return ['vue-style-loader'].concat(loaders)
      return loaders
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.entrys = getFiles('./src/web/pages/*');
// exports.entrys = getFiles('./src/web/pages/**/index.js');


exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
