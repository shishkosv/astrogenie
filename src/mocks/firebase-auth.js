// Basic mock implementation
const auth = () => ({
  signInWithEmailAndPassword: async (email, password) => ({}),
  signOut: async () => {},
  currentUser: null
});

auth.default = auth;
module.exports = auth; 