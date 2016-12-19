var path = require('path')
var merge = require('webpack-merge')
var webpack = require('webpack')
var webpackConfig = require('../../webpack.config.js')
var projectRoot = path.resolve(__dirname, '../../')


module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    // avoid walls of useless tests
    webpackMiddleware: {
      noInfo: true
    }
    //,
    // singleRun: true,
    // coverageReporter: {
    //   dir: './coverage',
    //   reporters: [
    //     { type: 'lcov', subdir: '.' },
    //     { type: 'text-summary' }
    //   ]
    // }
  })
}
