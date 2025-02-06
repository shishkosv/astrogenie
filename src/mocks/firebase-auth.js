// Basic mock implementation
const auth = () => ({
  signInWithEmailAndPassword: async (email, password) => ({
    user: {
      email,
      password,
      uid: 'mock-uid',
    },
  }),
  signOut: async () => {
    // Mock implementation that returns a resolved promise
    return Promise.resolve();
  },
  currentUser: null,
});

auth.default = auth;
module.exports = auth;
