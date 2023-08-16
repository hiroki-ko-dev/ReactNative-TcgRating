import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const textWidth = Math.round(Dimensions.get('window').width * 0.8);
const bubbleWidth = Math.round(Dimensions.get('window').width * 0.85);

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
  },
  left: {
    backgroundColor: '#4D4D4F',
    borderRadius: 10,
    maxWidth: bubbleWidth ,
  },
});

export const usernameStyles = StyleSheet.create({
  right: {
    color: 'black',
    flexWrap: 'wrap', // 折り返しを許可
  },
  left: {
    color: 'white',
    flexWrap: 'wrap', // 折り返しを許可
  },
});

export const timeTextStyles = StyleSheet.create({
  right: { 
    color: 'green'
  },
  left: {
    color: 'white'
  },
});
