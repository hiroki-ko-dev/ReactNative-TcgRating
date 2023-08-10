import { StyleSheet } from 'react-native';

const postCommentStyles = StyleSheet.create({
  replyContainer: {
    margin: 5,
    backgroundColor: '#E0F0FE',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyBorder: {
    backgroundColor: '#2699FB',
    width: 5,
    height: '100%',
  },
  replyName: {
    paddingTop: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#666',
  },
  replyText: {
    color: '#999',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  replyClose: {
    position: 'absolute',
    padding: 5,
    top: 0,
    right: 0,
  },
  replyBubbleContainer: {
    marginTop: 10,
    borderRadius: 5,
    maxWidth: 200,
    backgroundColor: '#15578F',
    overflow: 'hidden',
  },
});

export default postCommentStyles;