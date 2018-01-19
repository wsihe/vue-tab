'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const cssLoader = ExtractTextPlugin.extract({
  use: [
    'happypack/loader?id=happy-css'
  ]
})

// inject happypack accelerate packing for vue-loader
Object.assign(vueLoaderConfig.loaders, {
  js: 'happypack/loader?id=happy-babel-vue',
  css: cssLoader
})

const createHappyPlugin = (id, loaders) => new HappyPack({
  id,
  loaders,
  threadPool: happyThreadPool,
  // make happy more verbose with HAPPY_VERBOSE=1
  verbose: process.env.HAPPY_VERBOSE === '1',
})

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '@': resolve('src'),
      'pages': resolve('src/pages'),
      'utils': resolve('src/utils'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'services': resolve('src/services'),
    }
  },
  module: {
    noParse: /node_modules\/(element-ui\.js)/,
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract('style', 'happypack/loader?id=sass')
      // },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happy-babel-js',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg$/,
        use: [
          'svg-inline-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeViewBox: false },
                { removeXMLNS: true },
                {
                  cleanupIDs: {
                    prefix: {
                      toString() {
                        this.counter = this.counter || 0;
                        return `${this.counter++}-`;
                      }
                    }
                  }
                }
              ]
            }
          }
        ],
        include: [resolve('src/assets/icons-svg')]
      }
    ]
  },
  plugins: [

    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require('./vendor-manifest.json')
    }),
    createHappyPlugin('happy-babel-js', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happy-babel-vue', ['babel-loader?cacheDirectory=true']),
    // createHappyPlugin('sass', [ 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true' ]),
    createHappyPlugin('happy-css', ['css-loader', 'vue-style-loader']),
    // https://github.com/amireh/happypack/pull/131
    new HappyPack({
      loaders: [{
        path: 'vue-loader',
        query: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      }]
    })
  ]
}
