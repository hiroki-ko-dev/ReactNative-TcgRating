import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        alignSelf: 'stretch',
        backgroundColor: '#fffaf0',
        margin: 3
    },
    cardContent: {
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: 'white',
    },
    twitterIcon: {
        width: 200,
        height: 200,
    },
});

export default styles;