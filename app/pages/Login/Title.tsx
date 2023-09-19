import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './Login.style';

interface TitleProps {
  setDiscordView: (value: boolean) => void;
  setAppleView: (value: boolean) => void;
  // login: (e: any) => void;  // login function isn't used in this component
}

const Title: React.FC<TitleProps> = ({ setDiscordView, setAppleView }) => {
  return (
    <>
      <View style={styles.appleButtonView}>                          
        <TouchableOpacity
          onPress={() => {
            // const pushToken = await registerForPushNotificationsAsync()
            // setExpoPushToken(pushToken);
            setDiscordView(true);
          }}
        >
          <Image
            style={{width:300, height:40}}
            source={require('@/assets/images/apple/sign-in-button.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.appleButtonView}>                          
        <TouchableOpacity
          onPress={() => {
            // const pushToken = await registerForPushNotificationsAsync()
            // setExpoPushToken(pushToken);
            setAppleView(true);
          }}
        >
          <Image
            style={{width:300, height:40}}
            source={require('@/assets/images/apple/sign-in-button.png')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Title;