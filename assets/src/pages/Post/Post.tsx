import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './Index/Index';
import Show from './Show/Show';

const Post: React.FC = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Index">
            <Stack.Screen name="一覧">
                { () => <Index /> }
            </Stack.Screen>
            <Stack.Screen name="スレッド" component={ Show } />
        </Stack.Navigator>
    );
}

export default Post;