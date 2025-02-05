const path = require('path');
const { override, addWebpackAlias, babelInclude } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    'react-native': 'react-native-web',
  }),
  babelInclude([
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
  ]),
  (config) => {
    config.resolve.modules = [path.resolve(__dirname, 'src'), 'node_modules'];
    return config;
  }
);
