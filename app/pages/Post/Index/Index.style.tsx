import { StyleSheet } from 'react-native';

const postStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f6f6f6',
  },
  cardContent: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  snackView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: 12,
    color: '#555',
  },
  cardDate: {
    textAlign: 'right',
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: '#fffaf0',
    margin: 5,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  plusButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#7B7B7B",
  },
  buttonConform: {
    backgroundColor: "#007BFF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default postStyles;
