const path = require('path');
const { override, addWebpackAlias, babelInclude } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    'react-native$': 'react-native-web',
    'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter':
      'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
    'react-native/Libraries/vendor/emitter/EventEmitter':
      'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
    'react-native/Libraries/EventEmitter/NativeEventEmitter':
      'react-native-web/dist/vendor/react-native/NativeEventEmitter',
  }),
  babelInclude([
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
    path.resolve(__dirname, 'node_modules/@react-native-firebase/app'),
  ])
);
