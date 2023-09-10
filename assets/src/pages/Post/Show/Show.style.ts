import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5', // 背景色を明るいグレーに設定
  },
  card: {
    borderRadius: 8,  // カードの角を丸くする
    shadowColor: '#000', // 影の色を黒に設定
    shadowOffset: { width: 0, height: 1 }, // 影のオフセットを設定
    shadowOpacity: 0.2, // 影の不透明度を設定
    shadowRadius: 2,  // 影の半径を設定
    elevation: 3,  // Android用の影のelevationを設定
    padding: 10,
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  postUserName: {
    paddingLeft: 10,
  },
  cardDate: {
    flex: 2,
    fontSize: 12,
    color: 'gray',
  },
  postIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,  // アイコンを円形にする
    overflow: 'hidden',  // アイコンの外側を隠す
  },
  twitterIcon: {
    width: '100%',
    height: '100%',
  },
  loadingAnimation: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],  // ActivityIndicatorの位置を中央に設定
  },
  plusButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
