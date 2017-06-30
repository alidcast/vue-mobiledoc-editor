var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var projectRoot = path.resolve(__dirname, './')
var devRoot = path.resolve(__dirname, './demo')
var prodRoot = path.resolve(__dirname, './src')

const baseConfig = {
  resolve: {
    extensions: [
      '.js', '.vue'
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js', // use standalone package
      'src': prodRoot,
      'demo': devRoot
    },
    modules: [
      prodRoot,
      "node_modules"
    ]
  },
  module: {
    rules: [ // specify how module is created
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this nessessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/,
        include: projectRoot,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
}

const devConfig = {
    entry: `${devRoot}/main.js`,
    output: {
      publicPath: '/'
    },
    devtool: '#eval-source-map',
    devServer: {
      // contentBase: __dirname + "/src",
      historyApiFallback: true,
      noInfo: true
    },
    performance: { hints: false },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: `${devRoot}/index.html`,
        inject: true
      })
    ]
}

const prodConfig = {
  entry: `${prodRoot}/index.js`,
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
    library: 'vueMobiledocEditor',
    libraryTarget: 'umd'
  },
  externals: {
    vue: 'vue'
  },
  devtool: '#source-map',
  plugins: (baseConfig.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

const testConfig = {
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"testing"'
    })
  ]
}

var finalConfig

if (process.env.NODE_ENV === 'development') {
  finalConfig = merge(baseConfig, devConfig)
}
else if (process.env.NODE_ENV === 'production') {
  finalConfig = merge(baseConfig, prodConfig)
}
else if (process.env.NODE_ENV === 'testing') {
  finalConfig = merge(baseConfig, testConfig)
  // no need for original entry during tests
  delete finalConfig.entry
}
else {
  throw 'Node environment does not exist'
}

module.exports = finalConfig
