import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { APP_URL, GAME_ID } from '../../config';
import styles from './Login.style';
import { AuthContext } from '../../contexts/auth/AuthContext';
import DiscordView from './DiscordView';
import AppleView from './AppleView';
import Title from './Title';

const Login: React.FC = () => {

  const userContext = useContext(AuthContext);
  const [discordView, setDiscordView] = useState(false);
  const [appleView, setAppleView] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(null);

  if (!userContext) {
    throw new Error('UserContext is not provided');
  }
  const { setLoginUser } = userContext;

  //Web側からのpostMessageに対応
  const login = async (e: any) => {
    // const loginUserId = e.data;
    const loginUserId: number = 1;

    // ログインキャンセルした場合
    if (loginUserId === 0) {
      setLoginUser(null);
      return <></>;
    }

    const response = await fetch(APP_URL + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: loginUserId,
        game_id: GAME_ID,
        // expo_push_token: expoPushToken,
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    setDiscordView(false);
    setAppleView(false);

    try {
      const data = await response.json();
      setLoginUser(data.data);
    } catch (error) {
      console.error('Error during JSON parsing:', error);
    }
  };
  
  login(1);

  // if (discordView) {
  //   return <DiscordView setDiscordView={setDiscordView} login={login} />;
  // } else if (appleView){
  //   return <AppleView setAppleView={setAppleView} login={login} />;
  // } else if (!userContext.loginUser) {
    return <Title setDiscordView={setDiscordView} setAppleView={setAppleView} />;
  // } else {
  //   return (<></>);
  // }
}

export default Login;
