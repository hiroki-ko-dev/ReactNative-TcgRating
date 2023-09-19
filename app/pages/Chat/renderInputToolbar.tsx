import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { InputToolbar, Composer, Send } from 'react-native-gifted-chat';

export const renderInputToolbar = (replyingTo: any, setReplyingTo :any) => (props: any) => {
  return (
    <View>
      {replyingTo && (
        <View style={{ padding: 10, backgroundColor: "#e6e6e6", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
          <Text>返信先: {replyingTo.text}</Text>
          <TouchableOpacity onPress={() => setReplyingTo(null)}>
            <Text>キャンセル</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ padding: 10, backgroundColor: "#e6e6e6", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
          <Text>キャンセルaa</Text>
      </View>
      <InputToolbar {...props} containerStyle={{ borderTopWidth: 0 }}>
        <Send {...props}>
          <View style={{ marginRight: 10, marginBottom: 5 }}>
            <Text>送信</Text>
          </View>
        </Send>
      </InputToolbar>
    </View>
  );
};
