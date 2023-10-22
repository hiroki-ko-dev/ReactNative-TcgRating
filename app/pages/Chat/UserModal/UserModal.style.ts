import { StyleSheet } from 'react-native';

const UserModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    width: '95%',
    height: '40%',
    margin: 10,
    backgroundColor: 'black',
    color: 'white',
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
  confirmView: {
    marginTop: 10,
  },
  confirmButtonView: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalText: {
    color: 'white',
    width: '95%',
  },
  buttonView: {
    elevation: 2,
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    width: 100,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    // backgroundColor: 'grey',
  },
  closeButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserModalStyles;