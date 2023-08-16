import React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { APP_URL } from '../../config';
import styles from './Login.style';

const AppleView: React.FC<{ setAppleView: (value: boolean) => void, login: (e: any) => void }> = ({ setAppleView, login }) => {
  return (
    <>
      <View style={{backgroundColor:'black'}}>
        <View style={{height:70, backgroundColor:'black'}}></View>
        <View>
          <Text style={{marginLeft: 30, height:30,color:'white', fontSize:16}}
              onPress={() => setAppleView(false)}
          >
            完了
          </Text>
        </View>
      </View>
      <WebView
        source={{uri: APP_URL + '/auth/apple/api/login'}}
        onMessage={login}
        style={styles.spaceView}
      />
    </>
  )
}

export default AppleView;