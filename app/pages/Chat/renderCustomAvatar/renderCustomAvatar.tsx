import React from 'react';
import { Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import moment from 'moment';
import 'moment/locale/ja';
import { LoginUser } from '@/app/contexts/auth/type';

moment.locale('ja');

export const renderCustomAvatar = (setUserModalVisible: any) => (props: any) => {
  return (
    <TouchableOpacity 
      onPress={() => {
        setUserModalVisible(props.currentMessage.user._id);
      }}
    >
      <Image
        source={{ uri: props.currentMessage.user.avatar }}
        style={{ width: 30, height: 30, borderRadius: 15 }}
      />
    </TouchableOpacity>
  );
};