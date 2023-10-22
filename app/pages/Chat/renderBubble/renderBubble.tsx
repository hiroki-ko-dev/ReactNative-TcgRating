import React from 'react';
import { View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Bubble } from 'react-native-gifted-chat';
import { ChatIMessage } from '../type';
import { chatStyles, textStyles, wrapperStyles } from '../Chat.style';
import moment from 'moment';
import 'moment/locale/ja';
import { LoginUser } from '@/app/contexts/auth/type';
import renderBubbleStyles from './renderBubble.style';
import renderMessageText from './renderMessageText/renderMessageText';

moment.locale('ja');

export const renderBubble  = (
  loginUser: LoginUser,
  setReplyingTo: any,
  messages: any
) => (props: any) => {
  const shouldDisplayUsername = props.previousMessage.user?._id !== props.currentMessage.user._id;
  const isLoginUserMessage = props.currentMessage.user._id === loginUser.user.id;
  const time = moment(props.currentMessage.createdAt).format('HH:mm');

  return (
    <View>
      {shouldDisplayUsername && !isLoginUserMessage && (
        <View style={renderBubbleStyles.userNameView}>
          <Text style={renderBubbleStyles.userNameText}>
            {props.currentMessage.user.name}
          </Text>
        </View>
      )}
      <Animatable.View animation="fadeInUp" duration={500}>
        <View style={renderBubbleStyles.bubbleRow}>
          {isLoginUserMessage &&
            <View>
              <Text style={chatStyles.timeText}>{time}</Text>
            </View>
          }
          <View>
            <Bubble
              {...props}
              textStyle={textStyles}
              wrapperStyle={wrapperStyles}
              renderTime={() => null} 
              textProps={{ selectable: false }}
              renderMessageText={renderMessageText(isLoginUserMessage, setReplyingTo, messages)}
            />
          </View>
          {!isLoginUserMessage &&
            <View>
              <Text style={chatStyles.timeText}>{time}</Text>
            </View>
          }
        </View>
      </Animatable.View>
    </View>
  );
}
