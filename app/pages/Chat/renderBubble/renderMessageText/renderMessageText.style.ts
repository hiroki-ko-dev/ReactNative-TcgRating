import { StyleSheet } from 'react-native';

const renderMessageTextStyles = StyleSheet.create({
  bubbleRow: {
    // flex: 1,
    // padding: 10,
    // backgroundColor: '#F5F5F5', // 背景色を明るいグレーに設定
    flexDirection: 'row',
    // alignItems: 'flex-end'
  },
  userNameView: {
    padding: 5,
    flexWrap: 'wrap',
    width: '90%'
  },
  userNameText: {
    fontSize: 12,
    textAlign: 'left', 
    flexWrap: 'wrap',
  },
  avatarIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,  // アイコンを円形にする
    overflow: 'hidden',  // アイコンの外側を隠す
  },
  avatarIconImage: {
    width: '100%',
    height: '100%',
  },
});

export default renderMessageTextStyles;
