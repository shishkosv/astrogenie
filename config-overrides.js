const path = require('path');
const { override, addWebpackAlias, babelInclude } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackAlias({
    'react-native$': 'react-native-web',
    'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter':
      'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
    'react-native/Libraries/vendor/emitter/EventEmitter': 'eventemitter3',
    'react-native/Libraries/EventEmitter/NativeEventEmitter':
      'react-native-web/dist/vendor/react-native/NativeEventEmitter',
    '@react-native': 'react-native-web',
    'react-native/Libraries/Components/View/ViewStylePropTypes': 'react-native-web/dist/exports/View/ViewStylePropTypes',
    'react-native/Libraries/EventEmitter/NativeEventEmitter': 'react-native-web/dist/vendor/react-native/NativeEventEmitter'
  }),
  babelInclude([
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
    path.resolve(__dirname, 'node_modules/@react-native-firebase/app'),
  ]),
  (config, env) => {
    config.resolve = {
      ...config.resolve,
      extensions: ['.web.js', '.js', '.ts', '.tsx'],
      alias: {
        ...config.resolve.alias,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url/'),
        'react-native/Libraries/vendor/emitter/EventEmitter': path.resolve(__dirname, './src/mocks/EventEmitter.js'),
        'react-native': path.resolve(__dirname, './src/mocks/react-native.js'),
        '@react-native-firebase/app/lib/common': path.resolve(__dirname, './src/mocks/firebase-app-common.js'),
        '@react-native-firebase/app': path.resolve(__dirname, './src/mocks/firebase-app-common.js'),
        '@react-native-firebase/auth': path.resolve(__dirname, './src/mocks/firebase-auth.js')
      }
    };

    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    ];

    return config;
  }
);
