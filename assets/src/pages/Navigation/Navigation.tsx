import React from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Post from '../Post/Post';
// import DuelSearchApp from './assets/components/Duel/DuelSearchApp';
// import DuelHomeApp from './assets/components/Duel/DuelHomeApp';
// import Duel from '../Duel/Duel';
import Chat from '../Chat/Chat';
import Rank from '../Rank/Rank';
import Video from '../Video/Video';
import User from '../User/User';
import styles from './Navigation.style';

const Tab = createBottomTabNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator  screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="対戦を探す"
              children={ Chat }
              options={{
                  tabBarIcon: () => (<IconFontAwesome name={"search"}  />)
              }}
            />
            {/* <Tab.Screen
              name="対戦を探す"
              children={ Duel }
              options={{
                  tabBarIcon: () => (<IconFontAwesome name={"search"}  />)
              }}
            /> */}
            {/* <Tab.Screen
                name="対戦を探す"
                children={()=><DuelSearchApp />}
                options={{
                    tabBarIcon: () => (<IconFontAwesome name={"search"}  />)
                }}
            />
            <Tab.Screen
                name="自分の対戦"
                children={()=><DuelHomeApp />}
                options={{
                    tabBarIcon: () => (<IconFontAwesome name={"id-badge"} />),
                }}
            /> */}
           
            <Tab.Screen
                name="掲示板"
                children={()=><Post />}
                options={{
                    tabBarIcon: ({size, color}) => (<IconFontAwesome name={"twitch"} color={color} size={size} />)
                }}
            />
            <Tab.Screen name="ランキング" component={ Rank }
                options={{
                    tabBarIcon: ({size, color}) => (<IconFontAwesome name={"trophy"} color={color} size={size} />)
                }}
            />
            <Tab.Screen name="お知らせ" component={ Video }
                options={{
                    tabBarIcon: () => (<IconFontAwesome name={"youtube-play"} />)
                }}
            />
            <Tab.Screen
                name="マイページ" component={ User }
                options={{
                    tabBarIcon: () => (<IconFontAwesome name={"cog"} />)
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
