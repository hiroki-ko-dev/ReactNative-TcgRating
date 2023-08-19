import { StyleSheet } from 'react-native';

const createModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '95%',
    height: '80%',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'column',  // これを追加
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    elevation: 2,
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonConform: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#E57373',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,  // ここを追加
    width: '100%',
  },
});

export default createModalStyles;

