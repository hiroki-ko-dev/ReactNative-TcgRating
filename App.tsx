import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import Navigation from './assets/src/pages/Navigation/Navigation';
import Login from './assets/src/pages/Login/Login';
import { AuthContext } from './assets/src/contexts/auth/AuthContext';
import { LoginUser } from './assets/src/contexts/auth/type';
import { SnackProvider } from '@/contexts/snack/SnackProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';


Amplify.configure(awsconfig);

export default function App() {
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
  return (
    <SafeAreaProvider>
      <SnackProvider>
        <AuthContext.Provider value={{ loginUser, setLoginUser }}>
          {loginUser ? <Navigation /> : <Login />}
        </AuthContext.Provider>
      </SnackProvider>
    </SafeAreaProvider>
  );
}