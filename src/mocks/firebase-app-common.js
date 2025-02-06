module.exports = {
  DEFAULT_APP_NAME: '[DEFAULT]',
  getApp: () => ({
    name: '[DEFAULT]',
    options: {},
  }),
  getApps: () => [],
  initializeApp: () => ({
    name: '[DEFAULT]',
    options: {},
  }),
  // Add other common methods you might need
  isValidAppName: () => true,
  registerVersion: (name, version, variant) => {
    return { name, version, variant };
  },
};
