import React from 'react';
import { AuthContextType } from './type';

export const AuthContext = React.createContext<AuthContextType>({
  loginUser: null,
  setLoginUser: () => {},
});
