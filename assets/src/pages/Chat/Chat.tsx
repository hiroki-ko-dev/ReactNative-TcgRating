import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, Linking  } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { GiftedChat, IMessage, Day, Send } from 'react-native-gifted-chat';
import { onCreateMessage } from '../../../../src/graphql/subscriptions';
import { chatStyles } from './Chat.style';
import { fetchMessages, formatMessage } from './fetchMessages'; 
import sendMessage from './sendMessage'; 
import {getBottomSpace} from 'react-native-iphone-x-helper';
import { useLoginUser } from '@/contexts/auth/useLoginUser';
import moment from 'moment';
import 'moment/locale/ja';
import { DISCORD_URL } from '@/config';
import HowToUseModal from './HowToUseModal/HowToUseModal';
import { useIsFocused } from '@react-navigation/native';
import { renderBubble } from './renderBubble';
import { renderInputToolbar } from './renderInputToolbar';

moment.locale('ja');

const Chat: React.FC = () => {
  const loginUser = useLoginUser();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [howToUseModalVisible, setHowToUseModalVisible] = useState(false);
  const [lastReadMessageId, setLastReadMessageId] = useState(null);
  const isFocused = useIsFocused();
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    if (messages.length === 0){
      (async () => {
        const messageItems = await fetchMessages();
        setMessages(previousMessages => GiftedChat.append(previousMessages, messageItems));
      })();
    }
    
    const subscriptionResult = API.graphql(graphqlOperation(onCreateMessage));
  
    if ('subscribe' in subscriptionResult) {
      const subscription = subscriptionResult.subscribe({
        next: (eventData: any) => {
          const newMessage = eventData.value.data.onCreateMessage;
          console.log(newMessage);
          if (newMessage.userId !== loginUser.user.id.toString()) {
            setMessages(previousMessages => GiftedChat.append(previousMessages, [formatMessage(newMessage)]));
            if (!isFocused) {
              setLastReadMessageId(newMessage.id);  
            }
          } else {
            setLastReadMessageId(null); 
          }
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [isFocused]);
  
  useEffect(() => {
    if (!isFocused) {
      setLastReadMessageId(null);
    }
  }, [isFocused]);


  const renderLoading = () => <ActivityIndicator size="large" color="#0000ff" />;

  const renderDay = (props: any) => {
    const dateString = moment(props.currentMessage.createdAt).format("LL");
    return (
      <Day {...props} wrapperStyle={{ ...props.wrapperStyle, backgroundColor: 'transparent' }} textStyle={{...props.textStyle, fontSize: 15}} dateFormat={dateString} />
    );
  };

  const renderCustomDay = (props: any) => {
    const dateString = moment(props.currentMessage.createdAt).format("LL");
    if (props.currentMessage._id === lastReadMessageId) {
      return (
        <>
          <Day {...props} wrapperStyle={{ backgroundColor: 'transparent' }} textStyle={{...props.textStyle, fontSize: 15}} dateFormat={dateString} />
          <View style={{ alignItems: 'center', marginVertical: 8 }}>
            <Text style={ chatStyles.unreadText }>ここから未読メッセージ</Text>
          </View>
        </>
      );
    }
    return <Day {...props} wrapperStyle={{ ...props.wrapperStyle, backgroundColor: 'transparent' }} textStyle={{...props.textStyle, fontSize: 15}} dateFormat={dateString} />;
  };

  return (
    <View style={{ flex: 1 }}>
      {howToUseModalVisible ?
      <HowToUseModal
        howToUseModalVisible={howToUseModalVisible}
        setHowToUseModalVisible={setHowToUseModalVisible}
      />
      : <></>}
      <TouchableOpacity 
        style={[chatStyles.button, chatStyles.howToUseButton]}
        onPress={() => setHowToUseModalVisible(true)}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          使い方
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[chatStyles.button, chatStyles.discordButton]}
        onPress={() => Linking.openURL(DISCORD_URL)}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          Discord
        </Text>
      </TouchableOpacity>
      <GiftedChat
        messages={messages}
        onSend={newMessage => sendMessage(newMessage, loginUser, setMessages)}
        placeholder="テキストを入力してください"
        user={{ 
          _id: loginUser.user.id,
          name: loginUser.user.name,
        }}
        renderLoading={renderLoading}
        renderBubble={renderBubble(loginUser, setReplyingTo)}
        // renderInputToolbar={renderInputToolbar(replyingTo, setReplyingTo)}
        renderDay={renderCustomDay}
        keyboardShouldPersistTaps='never'
        bottomOffset={getBottomSpace() + 45}
        // onMessagePress={() => setReplyingTo(messages.id)}
        locale='ja'
        timeFormat='HH:mm'
        renderAvatarOnTop
      />
    </View>
  );
};

export default Chat;