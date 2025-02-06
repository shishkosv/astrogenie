import React from 'react';
import { firebaseService } from '../services/firebase';

const Auth = () => {
  const handleLogin = async (email: string, password: string) => {
    try {
      await firebaseService.signIn(email, password);
      // Handle successful login
    } catch (error) {
      // Handle error
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      {/* Add your authentication UI here */}
      <h2>Authentication</h2>
      {/* Example login form */}
      <form
        onSubmit={e => {
          e.preventDefault();
          const email = (e.target as any).email.value;
          const password = (e.target as any).password.value;
          handleLogin(email, password);
        }}
      >
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
