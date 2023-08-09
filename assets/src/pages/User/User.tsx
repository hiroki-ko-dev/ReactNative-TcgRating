import React, {useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, Button } from 'react-native';
import { Card, Title, Paragraph, Switch } from 'react-native-paper';
import userStyles from './User.style';
import { APP_URL } from '../../config';
import { AuthContext } from '../../contexts/auth/AuthContext';

const User = () => {
  const authContext = useContext(AuthContext);
  const { loginUser } = authContext;
  if (!loginUser) {
    return <></>
  }
  const [isSwitchOnA, setIsSwitchOnA] = useState(false);
  const [isSwitchOnB, setIsSwitchOnB] = useState(false);
  const [isSwitchOnC, setIsSwitchOnC] = useState(false);

  const onToggleSwitchA = () => setIsSwitchOnA(!isSwitchOnA);
  const onToggleSwitchB = () => setIsSwitchOnB(!isSwitchOnB);
  const onToggleSwitchC = () => setIsSwitchOnC(!isSwitchOnC);

  const logout = () =>{
    fetch( APP_URL + '/api/auth/logout', {method: 'GET'})
      .then(res => res.json())
  }

  return (
    <ScrollView>
        <View style={userStyles.header}><Text style={{fontSize: 20, fontWeight: "bold"}}>マイページ</Text></View>
        <View style={userStyles.container}>
            <Card style={userStyles.card}>
                <View style={userStyles.cardContent}>
                    <Text>{loginUser.user.name}</Text>
                </View>
            </Card>
            <Card style={userStyles.card}>
                <View style={userStyles.cardContent}>
                  <ImageBackground source={require('../../../images/icon/default-account.png')} resizeMode="cover" style={userStyles.twitterIcon}>
                    <Image
                      style={userStyles.twitterIcon}
                      source={{uri: loginUser.user.profileImagePath}}
                    />
                  </ImageBackground>
                </View>
            </Card>
            <Card style={userStyles.card}>
                <View style={userStyles.cardContent}>
                    <Text>レート：　{loginUser.user.rate}</Text>
                </View>
            </Card>
            {/* <Card style={userStyles.card}>
                <View style={userStyles.cardContent}>
                    <Text>PUSH通知設定A　</Text>
                    <Switch value={isSwitchOnA} onValueChange={onToggleSwitchA} />
                </View>
                <View style={userStyles.cardContent}>
                    <Text>PUSH通知設定B　</Text>
                    <Switch value={isSwitchOnB} onValueChange={onToggleSwitchB} />
                </View>
                <View style={userStyles.cardContent}>
                    <Text>PUSH通知設定C　</Text>
                    <Switch value={isSwitchOnC} onValueChange={onToggleSwitchC} />
                </View>
            </Card> */}
            <Card style={userStyles.card}>
                <View style={userStyles.cardContent}>
                    <Button mode="text" title="ログアウト" onPress={() => {logout()}} />
                </View>
            </Card>
        </View>
    </ScrollView>
  );
}

export default User;