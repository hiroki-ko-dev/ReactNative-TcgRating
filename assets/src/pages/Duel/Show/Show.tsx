import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, RefreshControl, Image, ImageBackground, Linking, TouchableOpacity, Alert, Pressable } from 'react-native';
import { Card, List, Button, Snackbar } from 'react-native-paper';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { APP_URL, DISCORD_URL } from "../../../config";
// import { Admob } from "../../components/Common/Common";
import { getDateFormat } from "../../../utils/date";
import showStyles from './Show.style';

const Show = ({navigation, route}) => {

  const [event, setEvent] = useState(route.params.event);
  let duelUser0 = event.event_duels[0].duel.duel_users[0]
  let duelUser1 = event.event_duels[0].duel.duel_users[1] ? event.event_duels[0].duel.duel_users[1] : null

  // SnacBar関連
  const [message, setMessage] = useState<string>('');
  const [snackVisible, setSnackVisible] = useState(false);

  const loginUser = route.params.loginUser;
  const badgeUpdate = route.params.badgeUpdate;

  const REQUEST_JOIN   = 1
  const REQUEST_CANCEL = 2
  const REQUEST_FINISH = 3  
  const REQUEST_WIN    = 4

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDuel()    
    setRefreshing(false);
  }, []);

  const cardTitle = (event) => {

    let status = null
    if(event.status == 0){
      status = <Text>対戦受付中</Text>
    }else if(event.status == 1){
      status = <Text style={{color:'red',fontWeight:'bold'}}>対戦中</Text>
    }else if(event.status == 2){
      status = <Text>対戦完了</Text>
    }else if(event.status == 3){
      status = <Text>キャンセル</Text>
    }else{
      status = <Text>無効試合</Text>
    }
    
    return (
      <View style={showStyles.cardTitle}>
        <View style={showStyles.cardTitleText}> 
          <Text>
            {'NO.' + event.id + ' '}
            {status}
          </Text>
          <Text style={{textAlign: 'right'}}>
            {'作成日：' + getDateFormat(event.created_at)}
          </Text>
        </View>
      </View>
    );
  }

  function rateTypeStr(){
    if(event.rate_type === 0){
      return 'レート戦'
    }else{
      return 'エキシビジョン戦';  
    }
  };

  function getDuel(){
    fetch( APP_URL + '/api/event/single/' + event.id, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setEvent(data)
      }) 
      .catch((error) => {
        setMessage('エラー：操作に失敗しました');
      })
  };

  const postDuel = (json) => {

    if(JSON.parse(json).status === 1){
      setMessage('対戦申し込みが完了しました');
    }else if(JSON.parse(json).status === 2){
      setMessage('対戦が完了しました');
    }else if(JSON.parse(json).status === 3){
      setMessage('対戦をキャンセルしました');
    }else if(JSON.parse(json).status === 11){
      setMessage('勝利報告をしました。もう1戦する場合はこのまま続けて下さい。');
    }

    fetch( APP_URL + '/api/event/single/' + event.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: json
    })
      .then(res => res.json())
      .then(data => {
        if(data.error){
          setMessage(data.error.messages); 
          getDuel();
        }else{
          setEvent(data);
          // badgeUpdate()
        }
      })
      .catch((error) => {
        setMessage('エラー：操作に失敗しました');
      });
    setSnackVisible(true);
  };

  const duelRequest = (request) =>{

    let conformMessage = null
    let statusNumber = null     

    if(request === 'join'){
      conformMessage = '対戦申し込みをしてもよろしいですか？'
      statusNumber = 1
    }else if(request === 'finish'){
      conformMessage = '対戦を完了してもよろしいですか？'
      statusNumber = 2          
    }else if(request === 'cancel'){
      conformMessage = '対戦をキャンセルしてもよろしいですか？'
      statusNumber = 3          
    }else if(request === 'win'){
      conformMessage = '勝利報告をしてもよろしいですか？'
      statusNumber = 11 
    }else{
      return false    
    }

    let json = JSON.stringify({
      event_id: event.id ,
      user_id: loginUser.user.id,
      status: statusNumber,
    });

    // let result = confirm( '(ブラウザ用)対戦申し込みをしてもよろしいですか？');
    // if(result) {        
    //     postDuel(json, 'request');
    // }

    Alert.alert(
      conformMessage,
      '',
      [
        {text: 'はい', onPress: () => postDuel(json)},
        {text: 'いいえ', onPress: () => ''},
      ],
      { cancelable: false }
    )
  }

  const VsView = () => {

    let player0Rate = 0
    let result = false

    duelUser0.duel_user_results.forEach((value) => {
      player0Rate += value.rating
      result = true 
    });
    let player1Rate = 0

    if(duelUser1){
      if(duelUser1.duel_user_results != undefined){
        duelUser1.duel_user_results.forEach((value, index) => {
          player1Rate +=  value.rating
        });
      }
    }
    return(
      <Card style={showStyles.card}>
        {cardTitle(event)}
        <View style={showStyles.playerName}>
          <Text style={[showStyles.playerNameText, {margin:10,fontWeight:'bold'}]}>{duelUser0.user.name}</Text>
        </View>
        <View style={showStyles.cardContent}>
          <View>
          <ImageBackground source={require('../../../../assets/images/icon/default-account.png')} resizeMode="cover" style={showStyles.twitterIcon}>
            <Image
              style={showStyles.twitterIcon}
              source={{uri: duelUser0.user.profileImageUrl}}
            />
          </ImageBackground> 
          </View>
          <View style={showStyles.cardContentCenter}>
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
          {duelUser1 ?
            <ImageBackground source={require('../../../../assets/images/icon/default-account.png')} resizeMode="cover" style={showStyles.twitterIcon}>
              <Image
                style={showStyles.twitterIcon}
                source={{uri: duelUser1.user.profileImageUrl}}
              />
            </ImageBackground>                    
          :
            <ImageBackground
              resizeMode="cover"
              style={showStyles.twitterIcon}
            /> 
          } 
        </View>
        {result && (
          <View style={showStyles.rateContent}>
            <Text style={{alignSelf: "flex-start",color:'white'}}>レート：<Text style={showStyles.rateText}>{player0Rate}</Text></Text>
            <Text style={{alignSelf: "flex-end",color:'white'}}>レート：<Text style={showStyles.rateText}>{player1Rate}</Text></Text>
          </View>
        )}
        <View style={showStyles.playerName}>
          <Text style={[showStyles.playerNameText, {margin:10,textAlign: 'right'}]}>{duelUser1 ? duelUser1.user.name : '募集中'}</Text>
        </View>
      </Card>
    );
  }

  const StatusChange = () =>{

    let statusButton = null;
    if(event.status === 0){
      if(loginUser.user.id === event.user.id){
        statusButton = 
          <Card style={showStyles.card}>
            <Button mode="contained" style={showStyles.button} color="grey" onPress={() => {duelRequest('cancel')}}>
              <IconFontAwesome name="remove" size={30} style={{paddingRight: 10}} color="white"/>
              <Text style={[showStyles.buttonText, {color: 'white'}]}>
                対戦をキャンセルする
              </Text>
            </Button>
          </Card>
      }else{
        statusButton = 
          <Card style={showStyles.card}>
            <Button mode="contained" style={showStyles.button} onPress={() => {duelRequest('join')}}>
              <IconFontAwesome name="handshake-o" style={{paddingRight: 10}} size={30} color="white"/>
              <Text style={[showStyles.buttonText,{color: 'white'}]}>
                対戦を申し込む
              </Text>
            </Button>
          </Card>
      }
    }
    else if(event.status === 1){
      if([duelUser0.user_id, duelUser1.user.id].includes(loginUser.user.id)){
        statusButton = 
          <Card style={showStyles.card}>
            <View>
              {event.rate_type === 0 && 
                <Button mode="contained" style={showStyles.button} onPress={() => {duelRequest('win')}}>
                  <IconFontAwesome name="thumbs-o-up" style={{paddingRight: 10}} size={30} color="white"/>
                  <Text style={[showStyles.buttonText, {color: 'white'}]}>
                    +1勝 しました
                  </Text>
                </Button>
              }
              <Button 
                mode="contained" 
                style={showStyles.button} 
                onPress={() => duelRequest('finish')}
              >
                <IconFontAwesome name="flag-checkered" style={{paddingRight: 10}} size={30} color="white"/>
                <Text style={[showStyles.buttonText, {color: 'white'}]}>
                  対戦終了
                </Text>
              </Button>
              <View>
                <Text style={{textAlign: 'center', marginBottom:10}}>※「対戦終了」は最終戦の勝者が押してください</Text>
              </View>
            </View>
          </Card>
      }
    }
      
    return(
      <View>
        {statusButton}
        {/* <Admob /> */}
        <Card style={showStyles.card}>
          {duelUser1 &&
            <Button mode="contained" style={showStyles.discordJoin} color="#7289da" onPress={() => {Linking.openURL(DISCORD_URL)}}>
                <IconFontisto name="discord" style={{marginsRight: 10}} size={30} color="white" />
                <Text style={[showStyles.buttonText, {color: 'white'}]}>対戦Discordに移動</Text>
            </Button>

            // <TouchableOpacity style={showStyles.cardContent} onPress={() => {
            //     Linking.openURL(DISCORD_URL)
            // }}>
                /* <Image
                    style={showStyles.discordJoin}
                    source={require('../../assets/images/discord/join.png')}
                /> */

            // </TouchableOpacity>
          }              
        </Card>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={showStyles.container}>
        <VsView />
        <StatusChange />
        <Card style={showStyles.card}>
          <List.Section style={showStyles.list}>
            <List.Item title={'対戦場所:　Discord ' + rateTypeStr() + ' ' + event.event_duels[0].duel.room_id} />
            <List.Item title={'レギュレーション:　' + (event.regulation_type==0 ? 'スタンダード' : 'エクストラ')} />
            <List.Item title={'プロキシ:　' + (event.card_type==0 ? 'なし' : 'あり')} />
          </List.Section>
        </Card>
        <Card style={showStyles.card}>
          <View style={{padding:20}}>
            <Text style={showStyles.noticeTitle}>対戦相手と連絡をとる時は？</Text>
            <Text style={showStyles.noticeContent}>回線不良や相手が現れない時はDiscordチャンネル「マッチング待ち合わせ用」で相手に連絡しましょう</Text>
            <Text style={showStyles.noticeTitle}>それでも連絡が取れない場合？</Text>
            <Text style={showStyles.noticeContent}>「対戦完了ボタン」を押し、対戦を終了して下さい</Text>
          </View>
        </Card>
      </View>
      <View style={showStyles.snackView}>
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
    </ScrollView>
  );
}

export default Show;