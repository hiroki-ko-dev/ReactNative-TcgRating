import React from 'react';
import { Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import moment from 'moment';
import 'moment/locale/ja';
import renderMessageTextStyles from './renderMessageText.style'

moment.locale('ja');

const renderMessageText = (isLoginUserMessage: boolean, setReplyingTo: any, messages: any) => (props: any) => {

  const replyToMessage = messages.find((message: any) => message._id === props.currentMessage.replyToId);

  const truncateText = (text: string) => {
    if (text.length > 20) {
      return text.substring(0, 20) + '...';
    }
    return text;
  };

  return (
    <TouchableOpacity onLongPress={() => { setReplyingTo(props.currentMessage); console.log(props.currentMessage); }}>
      {replyToMessage&&
        <View style={{ 
          padding: 10, 
          backgroundColor: isLoginUserMessage ? "lightgreen" : "grey",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderBottomWidth: 0.5,
          borderBottomColor: 'white',
          margin: 5,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ImageBackground
                source={require('@/assets/images/icon/default-account.png')} 
                resizeMode="cover"
                style={renderMessageTextStyles.avatarIcon}
              >
                <Image
                  style={renderMessageTextStyles.avatarIconImage}
                  source={replyToMessage.user.avatar}
                />
              </ImageBackground>
              <View style={{ marginLeft: 10 }}>
                <Text style={{
                  fontWeight: 'bold',
                  color: isLoginUserMessage ? "black" : "white",
                  fontSize: 10,
                }}>
                  {truncateText(replyToMessage.user.name)}
                </Text>
                <Text style={{
                  color: isLoginUserMessage ? "black" : "white",
                  fontSize: 12,
                }}>
                  {truncateText(replyToMessage.text)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      }
      <Text 
        style={{ 
        fontSize: 14,
        padding: 5, 
        textAlign: 'left', 
        flexWrap: 'wrap',
        color: isLoginUserMessage ? 'black' : 'white',
      }}>
        {props.currentMessage.text}
      </Text>
    </TouchableOpacity>
  );
};

export default renderMessageText;
