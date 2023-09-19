import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    cardRow: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        paddingTop: 50,
        paddingBottom: 20,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    thumbnailImage: {
        width: 160,
        height: 90,
    },
    pickerItem: {
        margin: 20,
        padding: 35,
        alignItems: "center",
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 5,
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
});

export default styles;