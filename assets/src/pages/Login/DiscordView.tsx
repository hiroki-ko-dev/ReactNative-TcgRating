import React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { APP_URL } from '../../config';
import styles from './Login.style';

const DiscordView: React.FC<{ setDiscordView: (value: boolean) => void, login: (e: any) => void }> = ({ setDiscordView, login }) => {
  return (
    <>
      <View style={{backgroundColor:'black'}}>
        <View style={{height:70, backgroundColor:'black'}}></View>
        <View>
          <Text style={{marginLeft: 30, height:30,color:'white', fontSize:16}}
              onPress={() => setDiscordView(false)}
          >
            完了
          </Text>
        </View>
      </View>
      <WebView
        source={{uri: APP_URL + '/auth/discord/api/login'}}
        onMessage={login}
        style={styles.spaceView}
      />
    </>
  );
}

export default DiscordView;