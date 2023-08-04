import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './Index';
import Show from './Show/Show';

export default function DuelHomeApp(props) {

    const Stack = createNativeStackNavigator();
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <Stack.Navigator initialRouteName="Index">
            <Stack.Screen name="自分の対戦一覧">
                { () => 
                    <Index navigation={navigation} 
                        route={route} 
                        loginUser={props.loginUser} 
                        type={'home'}
                        badgeUpdate={props.badgeUpdate}
                /> }
            </Stack.Screen>
            <Stack.Screen name="自分の対戦詳細" component={Show} />
        </Stack.Navigator>
    );
}