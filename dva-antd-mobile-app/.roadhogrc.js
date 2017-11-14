import PxToRem from 'postcss-pxtorem';

const path = require('path')
const { version } = require('./package.json')

console.log(path.resolve(__dirname, 'src/svg/'));
console.log(require.resolve('antd-mobile').replace(/warn\.js$/, ''));
const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
]

export default {
  entry : 'src/index.js',
  svgSpriteLoaderDirs : svgSpriteDirs,
  theme : "./theme.config.js",
  publicPath : `/android_asset/www/${version}/`,
  outputPath : `dist/www/${version}`,
  // 接口代理示例
  proxy: {
    "/api/v1/weather": {
      "target": "https://api.seniverse.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1/weather" : "/v3/weather" }
    },
    // "/api/v2": {
    //   "target": "http://192.168.0.110",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v2" : "/api/v2" }
    // }
  },
  env : {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd-mobile",
            "style": true
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd-mobile",
            "style": true
          }
        ]
      ]
    }
  },
  dllPlugin : {
    exclude: ["babel-runtime"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  },
  autoprefixer: {
    browsers: [
      'iOS >= 8',
      'Android >= 4'
    ]
  },
  extraPostCSSPlugins: [
    PxToRem({
      rootValue: 100,
      propWhiteList: [],
    }),
  ],
}
