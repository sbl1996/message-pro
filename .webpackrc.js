const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    'transform-decorators-legacy',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
  proxy: {
    "/api/message": {
      "target": "http://localhost:9000/",
      "changeOrigin": true,
    },
    "/login": {
      "target": "http://localhost:9000/",
      "changeOrigin": true,
    },
    "/api/currentUser": {
      "target": "http://localhost:9000/",
      "changeOrigin": true,
    },
    "/authority": {
      "target": "http://localhost:9000/",
      "changeOrigin": true,
    },
    "/logout": {
      "target": "http://localhost:9000/",
      "changeOrigin": true,
    }
  },
};
