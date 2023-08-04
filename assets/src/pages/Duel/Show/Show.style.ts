import { StyleSheet } from 'react-native';

const showStyles = StyleSheet.create({
  container: {
    margin: 5,
  },
  message: {
    textAlign: 'center',
    backgroundColor: 'red'
  },
  button: {
    padding: 10,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rateText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    alignSelf: 'stretch',
    marginBottom: 5,
  },
  cardTitle: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  cardTitleText: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 3,
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  cardContentLeft: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    padding: 10,
    width: 100,
  },
  cardContentCenter: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  cardContentRight: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    padding: 10,
    width: 100,
  },
  twitterIcon: {
    width: 70,
    height: 70,
  },
  list: {
    marginLeft:30
  },
  playerName: {
    backgroundColor: '#f0f8ff',
  },
  playerNameText: {
    color:'#FFFFFF',
    textShadowColor:'#111',
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius: 3,
  },
  rateContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    padding: 10,
  },
  discordJoin: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
    elevation: 2
  },
  noticeTitle: {
    fontSize: 14,
    color: 'grey',
  },
  noticeContent: {
    fontSize: 14,
    padding: 3,
    paddingBottom: 10,
  },
  snackView: {
    width: 350,
    position:'absolute',
    top:100
  },
});

export default showStyles;