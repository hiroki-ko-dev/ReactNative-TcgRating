import { StyleSheet } from 'react-native';

const postCommentStyles = StyleSheet.create({
  container: {
    flex: 1,  // これにより、全体の空きスペースを利用するようになります
    justifyContent: 'space-between', 
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  commentContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  userName: {
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 10,
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',  // 任意の色に変更可能
    borderTopWidth: 1,           // 任意の境界線のサイズ
    borderTopColor: '#e0e0e0',   // 任意の色に変更可能
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  userIcon: {
    width: 50,       // お好みに合わせてサイズを調整してください
    height: 50,      // お好みに合わせてサイズを調整してください
    borderRadius: 25, // 丸いアイコンにする場合は、widthとheightの半分の値を指定してください
    marginRight: 10,  // アイコンとテキストの間のスペース
  },
});

export default postCommentStyles;