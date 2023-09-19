import React, {useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView, RefreshControl, Button, Modal, Pressable, Image, ImageBackground, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native'
import { FAB, Portal, Provider, Card, RadioButton, Snackbar, Badge } from 'react-native-paper';
import { APP_URL } from "../../../config";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { getDateFormat } from "../../../utils/date";
import indexStyles from "./Index.style";
// import { Admob } from "../../components/Common/Common";

type RootStackParamList = {
  PostScreen: { post: Post };  // この行を適宜変更します。'PostScreen'はあなたのスクリーン名になります。
  // 他のスクリーンも必要に応じてここに追加できます。
};

const cardTitle = (event) => {

  let status = null
  let badge = null
  if(event.status == 0){
      status = <Text>対戦受付中</Text>
  }else if(event.status == 1){
      status = <Text style={{color:'red',fontWeight:'bold'}}>対戦中</Text>
      badge = <Badge style={{marginRight: 5}}>1</Badge>  
  }else if(event.status == 2){
      status = <Text>対戦完了</Text>
  }else if(event.status == 3){
      status = <Text>キャンセル</Text>
  }else{
      status = <Text>無効試合</Text>
  }

  return (
    <View style={indexStyles.cardTitle}>
      {badge}
      <View style={indexStyles.cardTitleText}> 
        <Text>
          {'NO.' + event.id + ' '}
          {status}
        </Text>
        <Text style={{textAlign: 'right', fontSize: 10}}>
          {'作成日：' + getDateFormat(event.created_at)}
        </Text>
      </View>
    </View>
  );
}

const Index = (
  // { badgeUpdate, type }
  ) => {
  const navigation = useNavigation();
  const userContext = useContext(AuthContext);
  if (!userContext) {
      throw new Error('UserContext is not provided');
  }
  const { loginUser } = userContext;
  if (!loginUser) {
    throw new Error('UserContext is not provided');
  }

  const route = useRoute<RouteProp<RootStackParamList, 'PostScreen'>>();
  if (!route.params) {
    // Display error message
    console.error('route.params is undefined');
    return;
  }

  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0);
  const [regulation, setRegulation] = useState<number>(0);
  const [proxy, setProxy] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const [selectedValue, setSelectedValue] = useState();

  // SnacBar関連
  const [snackVisible, setSnackVisible] = useState(false);

  let query = '';
  let detail = '';
  // if (type === 'search') {
      query = '?status=0';
      detail = '対戦詳細から探す';
  // }else{
  //     query = '?event_users_user_id=' + loginUser.id;
  //     detail = '自分の対戦詳細';
  // }

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getDuel()
      // badgeUpdate()
      setRefreshing(false);
    }, []);

  const isFocused = useIsFocused()
  useEffect(() => {
      getDuel()
  }, [isFocused])

  function getDuel(){
    // badgeUpdate()
    fetch( APP_URL + '/api/event/single' + query, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
          setEvents(data)
      }) 
      .catch((error) => {
          setMessage('エラー：操作に失敗しました');
          setSnackVisible(true)
      })    
  }

  function makeDuel(){
    let json = JSON.stringify({
      user_id: loginUser!.user.id,
      rate_type: rate,
      regulation_type: regulation,
      card_type: proxy,
    });

    fetch( APP_URL + '/api/event/single', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json
    })
      .then(res => res.json())
      .then(data => {
        setEvents(data)
        setMessage('対戦を作成しました');
        setSnackVisible(true)
      })
      .catch((error) => {
        setMessage('エラー：操作に失敗しました');
        setSnackVisible(true)
      })
    setModalVisible(!modalVisible);
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={indexStyles.container}>
          <View style={indexStyles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={indexStyles.modalView}>
                <Text style={indexStyles.modalText}>対戦ルールを決定して下さい</Text>
                <Text style={indexStyles.modalText}>・エキシビジョンはレートのやりとりが発生しない練習用対戦です。</Text>
                <Text style={indexStyles.modalText}>・プロキシは代用カード（カラーコピー）です。</Text>
                {/* <RadioButton.Item
                  value="0"
                  label="レート戦"
                  status={rate === 0 ? 'checked' : 'unchecked'}
                  onPress={() => { setRate(0) }}
                  />
                  <RadioButton.Item
                  value="1"
                  label="エキシビジョン戦"
                  status={rate === 1 ? 'checked' : 'unchecked'}
                  onPress={() => { setRate(1) }}
                /> */}
                <Picker
                  selectedValue={rate}
                  style={indexStyles.picker}
                  onValueChange={(value) => setRate(value)}
                >
                  <Picker.Item label="レート戦" value="0" />
                  <Picker.Item label="エキシビジョン戦" value="1" />
                </Picker>
                <Picker
                  selectedValue={regulation}
                  style={indexStyles.picker}
                  onValueChange={(value) => setRegulation(value)}
                >
                  <Picker.Item label="スタンダード" value="0" />
                  <Picker.Item label="エクストラ" value="1" />
                </Picker>
                <Picker
                  selectedValue={proxy}
                  style={indexStyles.picker}
                  onValueChange={(value) => setProxy(value)}
                >
                  <Picker.Item label="プロキシなし" value="0" />
                  <Picker.Item label="プロキシあり" value="1" />
                </Picker>
                <Pressable
                  style={[indexStyles.button, indexStyles.buttonConform]}
                  onPress={() => makeDuel()}
                >
                  <Text style={indexStyles.textStyle}>確定する</Text>
                  </Pressable>
                  <Pressable
                    style={[indexStyles.button, indexStyles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                  <Text style={indexStyles.textStyle}>閉じる</Text>
                </Pressable>
              </View>
            </Modal>
          </View>
          {(!events.data) && <View style={indexStyles.cardContent}><Text style={indexStyles.cardContent}>現在、対戦がありません</Text></View>}
          {events.data?.map((event, i) =>
          <Card style={indexStyles.card} key={event.id} 
            onPress={() => navigation.navigate(detail,
              {loginUser, event: event, badgeUpdate: badgeUpdate}
            )}
          >
            {/* {i%3 == 0 && <Admob />} */}
            {cardTitle(event)}
            <View style={indexStyles.playerName}>
                <Text style={[indexStyles.playerNameText,{margin:10,fontWeight:'bold'}]}>{event.event_users[0].user.name}</Text>
            </View>
            <View style={indexStyles.cardContent}>
                <View>
                <ImageBackground source={require('../../../../assets/images/icon/default-account.png')} resizeMode="cover" style={indexStyles.twitterIcon}>
                  <Image
                    style={indexStyles.twitterIcon}
                    source={{uri: event.event_users[0].user.twitter_image_url}}
                  />
                </ImageBackground> 
                </View>
                <View style={indexStyles.cardContentCenter}>
                  {event.rate_type == 0 ? 
                    <View style={{backgroundColor: '#f5f5f5'}}>
                      <Text>レート戦</Text>
                    </View>
                  :
                    <View style={{backgroundColor: '#f5f5f5'}}>
                      <Text>エキシビジョン戦</Text>
                    </View>
                  }
                  <Image
                    style={{width: 45,height:30}}
                    source={require('../../../../assets/images/duel/vs.jpg')}
                  />
                </View>
                {event.event_users[1] ?
                  <ImageBackground source={require('../../../../assets/images/icon/default-account.png')} resizeMode="cover" style={indexStyles.twitterIcon}>
                    <Image
                      style={indexStyles.twitterIcon}
                      source={{uri: event.event_users[1].user.twitter_image_url}}
                    />
                  </ImageBackground>                    
                :
                  // <ImageBackground source={require('../../assets/images/icon/default-account.png')} resizeMode="cover" style={indexStyles.twitterIcon} /> 
                  // <ImageBackground resizeMode="cover" style={indexStyles.twitterIcon} /> 
                  <></>
                } 
              </View>
              <View style={[indexStyles.playerName]}>
                <Text style={[indexStyles.playerNameText,{margin:10,textAlign: 'right'}]}>{event.event_users[1] ? event.event_users[1].user.name : '募集中'}</Text>
                {/* <Text style={{margin:10,textAlign: 'right',fontWeight:'bold'}}>{event.event_users[1] ? event.event_users[1].user.name : '募集中'}</Text> */}
              </View>
            </Card>
          )}
          <View style={indexStyles.snackView}>
            <Snackbar 
              visible={snackVisible}
              onDismiss={() => setSnackVisible(false)}
              action={{
                label: "閉じる",
                onPress: () => setSnackVisible(false)
              }}
            >
              {message}
            </Snackbar>
          </View>
        </View>
      </ScrollView>
      <View style={indexStyles.plusButton}>
        <Provider>
          <FAB icon="plus"
            onPress={() => setModalVisible(true)}
          />
        </Provider>
      </View>
    </>
  );
}

export default Index;