import React from 'react';
import { TouchableOpacity, View, Text, Image, ImageBackground } from 'react-native';
import renderChatFooterStyles from './renderChatFooter.style';

export const renderChatFooter = (replyingTo: any, setReplyingTo :any) => {
  
  const truncateText = (text: string) => {
    if (text.length > 15) {
      return text.substring(0, 20) + '...';
    }
    return text;
  };

  return (
    <>
      {replyingTo && (
        <View style={{ padding: 10, backgroundColor: "#e6e6e6", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ImageBackground 
                source={require('@/assets/images/icon/default-account.png')} 
                resizeMode="cover" 
                style={renderChatFooterStyles.avatarIcon}
              >
                <Image
                  style={renderChatFooterStyles.avatarIconImage}
                  source={replyingTo.user.avatar}
                />
              </ImageBackground>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{truncateText(replyingTo.user.name)}</Text>
                <Text style={{ fontStyle: 'italic' }}>{truncateText(replyingTo.text)}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setReplyingTo(null)}>
              <Text style={{fontSize: 20}}> × </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};