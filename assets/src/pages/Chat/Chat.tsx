import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import * as Animatable from 'react-native-animatable';
import { GiftedChat, Bubble, IMessage, Time } from 'react-native-gifted-chat';
import { onCreateMessage } from '../../../../src/graphql/subscriptions';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { textStyles, wrapperStyles, usernameStyles, timeTextStyles } from './Chat.style';
import { fetchMessages, formatMessage } from './fetchMessages'; 
import sendMessage from './sendMessage'; 
import {getBottomSpace} from 'react-native-iphone-x-helper';
import { utcConvertToJST } from '../../utils/date';

const Chat: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { loginUser } = authContext;
  if (!loginUser) {
    return <></>
  }
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageAnimation, setMessageAnimation] = useState(false);

  useEffect(() => {
    (async () => {
      const messageItems = await fetchMessages();
      setMessages(previousMessages => GiftedChat.append(previousMessages, messageItems));
      setMessageAnimation(true);
    })();
    
    const subscriptionResult = API.graphql(graphqlOperation(onCreateMessage));
  
    if ('subscribe' in subscriptionResult) {
      const subscription = subscriptionResult.subscribe({
        next: (eventData: any) => {
          const newMessage = eventData.value.data.onCreateMessage;
          if (newMessage.userId !== loginUser.user.id.toString()) {
            setMessages(previousMessages => GiftedChat.append(previousMessages, [formatMessage(newMessage)]));
          }
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const renderLoading = () => <ActivityIndicator size="large" color="#0000ff" />;

  const renderBubble = (props: any) => {
      return (
        <Animatable.View animation="fadeInUp" duration={500}>
          <Bubble
            {...props}
            textStyle={textStyles}
            wrapperStyle={wrapperStyles}
            usernameStyle={usernameStyles}
          />
        </Animatable.View>
      );
  }

  const renderTime = (props: any) => {
    const jstDate = utcConvertToJST(props.currentMessage.createdAt);
    return (
      <Time
        {...props}
        timeTextStyle={timeTextStyles}
        currentMessage={{...props.currentMessage, createdAt: jstDate}}
      />
    );
};

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => sendMessage(newMessage, loginUser, setMessages, setMessageAnimation)}
      placeholder="テキストを入力してください"
      user={{ 
        _id: loginUser.user.id,
        name: loginUser.user.name,
      }}
      renderUsernameOnMessage={true}
      renderLoading={renderLoading}
      renderBubble={renderBubble}
      renderTime={renderTime}
      keyboardShouldPersistTaps='never'
      bottomOffset={getBottomSpace() + 45}
      locale='ja'
      timeFormat='HH:mm'
      renderAvatarOnTop
    />
  );
};

export default Chat;