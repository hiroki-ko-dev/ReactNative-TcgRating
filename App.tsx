import React, { useState } from 'react';
import Navigation from './assets/src/pages/Navigation/Navigation';
import Login from './assets/src/pages/Login/Login';
import { AuthContext } from './assets/src/contexts/auth/AuthContext';
import { LoginUser } from './assets/src/contexts/auth/type';

export default function App() {
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
  return (
    <AuthContext.Provider value={{ loginUser, setLoginUser }}>
      {loginUser ? <Navigation /> : <Login />}
    </AuthContext.Provider>
  );
}