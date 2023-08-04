import { StyleSheet } from 'react-native';

const indexStyles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  message: {
      textAlign: 'center',
      backgroundColor: 'red'
  },
  centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
  card: {
      alignSelf: 'stretch',
      margin: 15,
      paddingLeft: 10,
      paddingRight: 10,
  },
  cardTitle: {
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-between',
      backgroundColor: 'white',
  },
  cardTitleText: {
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-between',
      padding: 3,
  },
  cardContent: {
      flexDirection: 'row',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: 10,
  },
  cardContent: {
      flexDirection: 'row',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: 10,
      paddingTop: 0,
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
  playerName: {
      backgroundColor: '#f0f8ff',
  },
  playerNameText: {
      color:'#FFFFFF',
      textShadowColor:'#111',
      textShadowOffset:{width: 1, height: 1},
      textShadowRadius: 3,
  },

  twitterIcon: {
      width: 50,
      height: 50,
  },
  modalView: {
      margin: 20,
      marginTop:50,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
  },
  picker: {
      height: 130
  },
  badge: {
      backgroundColor: "red",
      width: 20,
      height: 20,
  },  
  button: {
      borderRadius: 20,
      padding: 15,
      margin:30,
      elevation: 2
  },
  buttonClose: {
      backgroundColor: "#696969",
  },
  buttonConform: {
      backgroundColor: "#2196F3",
      marginBottom: 3,
  },
  textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
  },
  modalText: {
      marginBottom: 0,
  },
  snackView: {
      width: 350,
      position:'absolute',
      top:100
  },
  plusButton: {
      position:'absolute',
      bottom: 20,
      right: 20,
  },

});

export default indexStyles;