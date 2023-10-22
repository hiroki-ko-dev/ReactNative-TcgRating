import React, { useState, useEffect, useRef, useContext } from 'react';
import { Platform, Text, View, Image, TouchableOpacity } from 'react-native';
import { APP_URL, GAME_ID } from '@/app/config';
import styles from './Login.style';
import { useAuth } from '../../contexts/auth/useAuth';
import { useSnackbar } from '@/app/contexts/snack/useSnackbar';
import DiscordView from './DiscordView';
import AppleView from './AppleView';
import Title from './Title';

const Login = () => {

  const [discordView, setDiscordView] = useState(false);
  const [appleView, setAppleView] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(null);

  const { loginUser, setLoginUser } = useAuth();
  const { setSnackMessage } = useSnackbar();

  //Web側からのpostMessageに対応
  const login = async (e: any) => {
    let loginUserId: number;
    if (Platform.OS === 'web') {
      loginUserId = 14;
    } else {
      // loginUserId = 1;
      const parsedData = JSON.parse(e.nativeEvent.data);
      console.log(parsedData.loginId);
      loginUserId = parseInt(parsedData.loginId, 10);
      console.log(loginUserId);
    }
    // ログインキャンセルした場合
    if (loginUserId === 0) {
      setLoginUser(null);
      setSnackMessage('ログインエラーが発生しました');
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
      setSnackMessage('ログインエラーが発生しました')
    }
  };
  if (Platform.OS === 'web') {
    login(14);
  }
  else {
    if (discordView) {
      return <DiscordView setDiscordView={setDiscordView} login={login} />;
    } else if (appleView){
      return <AppleView setAppleView={setAppleView} login={login} />;
    } else if (!loginUser) {
      return <Title setDiscordView={setDiscordView} setAppleView={setAppleView} />;
    } else {
      return (<></>);
    }
  }
}

export default Login;
