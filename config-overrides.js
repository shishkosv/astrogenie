const path = require('path');
const { override, addWebpackAlias, babelInclude, disableEsLint } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  disableEsLint(),
  addWebpackAlias({
    'react-native$': 'react-native-web',
    'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter':
      'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
    'react-native/Libraries/vendor/emitter/EventEmitter': 'eventemitter3',
    'react-native/Libraries/EventEmitter/NativeEventEmitter':
      'react-native-web/dist/vendor/react-native/NativeEventEmitter',
    '@react-native': 'react-native-web',
    'react-native/Libraries/Components/View/ViewStylePropTypes': 'react-native-web/dist/exports/View/ViewStylePropTypes',
    'react-native/Libraries/EventEmitter/NativeEventEmitter': 'react-native-web/dist/vendor/react-native/NativeEventEmitter',
    '@expo/vector-icons': 'react-native-vector-icons',
  }),
  babelInclude([
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
    path.resolve(__dirname, 'node_modules/@react-native-firebase/app'),
  ]),
  (config, env) => {
    // Disable fork-ts-checker-webpack-plugin
    config.plugins = config.plugins.filter(plugin => 
      plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
    );

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'react-native$': 'react-native-web',
        'react-native/Libraries/Renderer/shims/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry',
        'react-native/Libraries/Components/View/ViewStylePropTypes': 'react-native-web/dist/modules/ViewStylePropTypes',
        'react-native/Libraries/Components/TextInput/TextInputStylePropTypes': 'react-native-web/dist/modules/TextInputStylePropTypes',
        'react-native/Libraries/Components/View/ViewPropTypes': 'react-native-web/dist/modules/ViewPropTypes',
        'react-native/Libraries/vendor/emitter/EventEmitter': path.resolve(__dirname, './src/mocks/EventEmitter.js'),
        'react-native': 'react-native-web',
        '@react-native-firebase/app/lib/common': path.resolve(__dirname, './src/mocks/firebase-app-common.js'),
        '@react-native-firebase/app': path.resolve(__dirname, './src/mocks/firebase-app-common.js'),
        '@react-native-firebase/auth': path.resolve(__dirname, './src/mocks/firebase-auth.js'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url/')
      },
      extensions: ['.web.js', '.js', '.web.ts', '.ts', '.web.tsx', '.tsx']
    };

    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    ];

    return config;
  },
  (config) => {
    // Add rule for font files
    config.module.rules.push({
      test: /\.(ttf|eot|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
      include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
    });

    return config;
  }
);
