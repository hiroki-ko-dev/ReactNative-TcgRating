import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const textWidth = Math.round(Dimensions.get('window').width * 0.8);
const bubbleWidth = Math.round(Dimensions.get('window').width * 0.85);

export const chatStyles = StyleSheet.create({
  button: {
    width: 100, // 幅を設定
    height: 40, // 高さを設定
    borderRadius: 20, // 丸くする
    alignItems: 'center', // 中央寄せ
    justifyContent: 'center', // 中央寄せ
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Androidの影
    position: 'absolute',
    zIndex: 10,
    right: 10,
  },
  howToUseButton: {
    top: 50, // 適切な値に調整してください
    backgroundColor: '#000000',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  discordButton: {
    top: 100, // 適切な値に調整してください
    backgroundColor: '#7289DA',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  unreadText: {
    color: 'white',
    width: '90%',
    fontSize: 8,
    backgroundColor: 'rgba(150, 150, 150, 0.7)', // 濃いグレーの背景色
    borderRadius: 10, // 角を丸くする
    paddingVertical: 5, // 上下のパディングを追加
    paddingHorizontal: 10, // 左右のパディングを追加
    textAlign: 'center',
  },
  timeText: {
    padding: 5,
    fontSize: 10,
    color: 'grey'
  }

});

export const textStyles = StyleSheet.create({
  right: {
    color: 'black',
    flexWrap: 'wrap', // 折り返しを許可
  },
  left: {
    color: 'white',
    flexWrap: 'wrap', // 折り返しを許可
  },
});

export const wrapperStyles = StyleSheet.create({
  right: {
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    maxWidth: bubbleWidth ,
    marginLeft: 0,
    paddingBottom: 7,
  },
  left: {
    flex: 1,
    backgroundColor: 'grey',
    borderRadius: 10,
    maxWidth: bubbleWidth ,
    marginRight: 0,
    paddingBottom: 7,
  },
});
