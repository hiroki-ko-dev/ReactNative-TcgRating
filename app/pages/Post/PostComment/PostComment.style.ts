import { StyleSheet } from 'react-native';

const postCommentStyles = StyleSheet.create({
  container: {
    flex: 1,  // これにより、全体の空きスペースを利用するようになります
    justifyContent: 'space-between', 
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 50,
  },
  commentContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  noAndDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentNo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  dateText: {
    fontSize: 10,
    color: 'gray',
    marginRight: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  userIcon: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  bodyText: {
      marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',  // 任意の色に変更可能
    borderTopWidth: 1,           // 任意の境界線のサイズ
    borderTopColor: '#e0e0e0',   // 任意の色に変更可能
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#007AFF', // 例として青色を使用
    padding: 8,
    borderRadius: 20, // ボタンの角を丸くする
    alignItems: 'center',  // これをcenterに変更
    justifyContent: 'flex-end',  // 中央から下寄せに変更
    marginLeft: 10, // テキストエリアとの間隔を開ける
  },
  plusButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

export default postCommentStyles;