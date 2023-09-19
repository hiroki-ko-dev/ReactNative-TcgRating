import { StyleSheet } from 'react-native';

const renderBubbleStyles =  StyleSheet.create({
  bubbleRow: {
    // flex: 1,
    // padding: 10,
    // backgroundColor: '#F5F5F5', // 背景色を明るいグレーに設定
    flexDirection: 'row',
    // alignItems: 'flex-end'
    margin: 2,
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
    color: 'white',
  }
});

export default renderBubbleStyles;
