import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    logo: {
        marginTop: 200,
        width: 300,
        height: 110,
    },
    twitterButtonView: {
        marginTop: 200,
        width: 300,
    },
    twitterButton: {
        padding: 5,
    },
    twitterLogined: {
        width: 300,
        marginTop: 50,
    },
    twitterLoginedText: {
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 20,
        color: 'white',
    },
    appleButtonView: {
        marginTop: 50,
        width: 300,
    },

    discordJoin: {
        marginTop: 20,
        width: 300,
    },
    discordName: {
        marginTop: 20,
        width: 300,
    },
    // タブ関連
    tavScreen: {
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spaceView: {
        margin: 5,
        marginTop: 30,
    },
});

export default styles;