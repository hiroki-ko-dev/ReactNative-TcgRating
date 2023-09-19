import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from '@/src/aws-exports';
import Navigation from '@/app/pages/Navigation/Navigation';
import Login from '@/app/pages/Login/Login';
import { AuthContext } from '@/app/contexts/auth/AuthContext';
import { LoginUser } from '@/app/contexts/auth/type';
import { ImageProvider } from '@/app/contexts/image/ImageProvider';
import { SnackProvider } from '@/app/contexts/snack/SnackProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

Amplify.configure(awsconfig);

export default function App() {
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
  return (
    <SafeAreaProvider>
      <SnackProvider>
        <ImageProvider>
          <AuthContext.Provider value={{ loginUser, setLoginUser }}>
            {loginUser ? <Navigation /> : <Login />}
          </AuthContext.Provider>
        </ImageProvider>
      </SnackProvider>
    </SafeAreaProvider>
  );
}