import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './Index/Index';
import Show from './Show/Show';

const Duel: React.FC = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation()
  const route = useRoute()
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen name="対戦一覧から探す" component={ Index } />
        {/* {  Index 
            // navigation={navigation} 
            // route={route} 
            // loginUser={props.loginUser}                         
            // type={'search'}
            // badgeUpdate={props.badgeUpdate}
        } */}
      <Stack.Screen name="対戦詳細から探す" component={ Show } />
    </Stack.Navigator>
  );
}

export default Duel;