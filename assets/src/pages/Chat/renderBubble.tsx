import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Bubble } from 'react-native-gifted-chat';
import { chatStyles, textStyles, wrapperStyles } from './Chat.style';
import moment from 'moment';
import 'moment/locale/ja';
import { LoginUser } from '@/contexts/auth/type';

moment.locale('ja');

export const renderBubble  = (loginUser: LoginUser, setReplyingTo: any) => (props: any) => {
  const shouldDisplayUsername = props.previousMessage.user?._id !== props.currentMessage.user._id;
  const isCurrentUserMessage = props.currentMessage.user._id === loginUser.user.id;
  const time = moment(props.currentMessage.createdAt).format('HH:mm');

  return (
    <View>
      {shouldDisplayUsername && !isCurrentUserMessage && (
        <View
        style={{ 
          padding: 5, 
          flexWrap: 'wrap',
          width: '90%'
        }}
        >
          <Text 
            style={{ 
              fontSize: 12,
              padding: 5, 
              textAlign: 'left', 
              flexWrap: 'wrap',
            }}
          >
            {props.currentMessage.user.name}
          </Text>
        </View>
      )}
      <Animatable.View animation="fadeInUp" duration={500}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          {isCurrentUserMessage &&
            <Text style={chatStyles.timeText}>{time}</Text>
          }
          <TouchableOpacity onLongPress={() => setReplyingTo(props.currentMessage.id)}>
            <Bubble
              {...props}
              textStyle={textStyles}
              wrapperStyle={wrapperStyles}
              renderTime={() => null} 
            />
          </TouchableOpacity>
          {!isCurrentUserMessage &&
            <Text style={chatStyles.timeText}>{time}</Text>
          }
        </View>
      </Animatable.View>
    </View>
  );
}
