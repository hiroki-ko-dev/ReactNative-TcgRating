import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView, RefreshControl, Linking, Pressable, Modal } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/core';
import { FAB, Provider, Snackbar  } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { PostType } from '../type';
import postStyles from '../Post.style';
import { RootStackParamList } from '../../Navigation/type';
import getPosts from './getPosts';
import Result from './Result';
import CreateModal from './CreateModal';

const Index = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, '一覧'>>();
  const userContext = useContext(AuthContext);
  const { loginUser } = userContext;
  if (!loginUser) {
      throw new Error('UserContext is not provided');
  }
  const [posts, setPosts] = useState<PostType[]>([]);
  const [title, setTitle] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState<number>(0);

  // SnacBar関連
  const [message, setMessage] = useState<string>('');
  const [snackVisible, setSnackVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  useEffect(() => {
    getPosts(setPosts, setMessage, setSnackVisible);
  },[]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts(setPosts, setMessage, setSnackVisible);
    setRefreshing(false);
  }, []);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={postStyles.container}>
          <CreateModal
            loginUser={loginUser}
            setMessage={setMessage}
            setSnackVisible={setSnackVisible}
            modalVisible={modalVisible} // こちらを追加
            setModalVisible={setModalVisible} // こちらも追加
          />
          {(!posts) && <View style={postStyles.cardContent}><Text style={postStyles.cardContent}>現在スレッドがありません</Text></View>}

          {posts?.map((post: PostType, i) =>
            <Result
              post={post}
              i={i}
              navigation={navigation}
              key={post.id}
            />
          )}
          <View style={postStyles.snackView}>
            <Snackbar 
              visible={snackVisible}
              onDismiss={() => setSnackVisible(false)}
              action={{
                label: "閉じる",
                onPress: () => setSnackVisible(false)
              }}
            >
              {message}
            </Snackbar>
          </View>
        </View>
      </ScrollView>
      <View style={postStyles.plusButton}>
        <Provider>
          <FAB icon="plus"
            onPress={() => setModalVisible(true)}
          />
        </Provider>
      </View>
    </>
  );
}

export default Index;