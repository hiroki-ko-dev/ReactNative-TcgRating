import { StyleSheet } from 'react-native';

const postStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-between',
  },
  cardTitle: {
      flexDirection: 'row',
      flexGrow: 1,
      margin: 10,
  },
  cardHeaderText: {
      fontSize: 8,
  },
  cardDate: {
      textAlign: 'right',
  },
  cardTitleText: {
      fontSize:14,
      fontWeight: 'bold',
      marginLeft: 10,
      paddingHorizontal: 10,
  },
  card: {
      alignSelf: 'stretch',
      backgroundColor: '#fffaf0',
      margin: 5,
  },
  cardContent: {
      textAlign: 'left',
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: 10,
  },
  centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
  },
  modalView: {
      width: 400,
      margin: 5,
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
  pickerItem: {
      margin: 20,
      padding: 35,
      alignItems: "center",
      elevation: 5
  },
  button: {
      borderRadius: 20,
      padding: 15,
      margin:30,
      elevation: 2
  },
  buttonOpen: {
      backgroundColor: "#F194FF",
  },
  buttonClose: {
      backgroundColor: "#696969",
  },
  buttonConform: {
      backgroundColor: "#2196F3",
      marginTop: 50,
      marginBottom: 3,
  },
  textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
  },
  modalText: {
      marginBottom: 15,
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

export default postStyles;