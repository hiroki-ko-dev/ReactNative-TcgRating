import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './Index/Index';
import Show from './Show/Show';
import { RootStackParamList } from '../Navigation/type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Post = () => {
  return (
    <Stack.Navigator initialRouteName="一覧">
      <Stack.Screen name="一覧" component={ Index } />
      <Stack.Screen name="スレッド" component={ Show } />
    </Stack.Navigator>
  );
}

export default Post;