import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  postHeader:{
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    marginBottom: 5,
  },
  twitterIcon:{
    width: 50,
    height: 50,
  },
  postUser: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  postIcon:{
    flex:1,
    alignItems: 'flex-end',
  },
  postUserText:{
    textAlign: 'right',
  },
  cardTitle:{
    height: 100,
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 14,
  },
  card: {
    alignSelf: 'stretch',
    marginBottom: 13,
    padding: 5,
    paddingLeft: 10,
    paddingBottom: 15,
  },
  cardDate: {
    textAlign: 'right',
    fontSize: 12,
  },
  comments: {
    height: 100,
  },
  loadingAnimation: {
    position:'absolute',
    top:300,
    left: '45%',
  },
});

export default styles;