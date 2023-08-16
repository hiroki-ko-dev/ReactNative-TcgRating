import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import { FAB, Provider, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { PostType, IndexResponseType } from '../type';
import postStyles from './Index.style';
import { RootStackParamList } from '../../Navigation/type';
import Result from './Result';
import CreateModal from './CreateModal';
import { APP_URL } from "@/config";
import { fetchIndex, FetchIndexType } from '@/services/fetchIndex';
import Paginator from '@/components/Paginator/Paginator';

const Index = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { loginUser } = useContext(AuthContext);
  if (!loginUser) {
      throw new Error('UserContext is not provided');
  }

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [snackVisible, setSnackVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const path = `${APP_URL}/api/post`;
  const query = '';
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchedData, setFetchedData] = useState<FetchIndexType<PostType[], any>>(
    { data: undefined, paginate: undefined, error: undefined }
  );

  useEffect(() => {
    async function fetchData() {
      const result = await fetchIndex<PostType[], Error>(path, query, currentPage);
      setFetchedData(result);
    }
    fetchData();
  }, [currentPage]);

  const { data: posts, paginate: paginate, error: error } = fetchedData;

  if (!posts || !paginate) {
    return <></>;
  }

  const onRefresh = () => {
    setCurrentPage(1);
  };

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
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          {(!posts) &&
            <View style={postStyles.cardContent}>
              <Text style={postStyles.cardContent}>現在スレッドがありません</Text>
            </View>
          }
          {posts.map((post: PostType, i: number) => (
            <Result
              post={post}
              i={i}
              navigation={navigation}
              key={post.id}
            />
          ))}
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
        <View style={{ marginBottom: 100 }}>
          <Paginator
            path={path}
            paginate={paginate}
            onNext={() => setCurrentPage(prev => prev + 1)} 
            onPrevious={() => setCurrentPage(prev => prev - 1)}
          />
        </View>
      </ScrollView>
      <Provider>
        <FAB
          style={postStyles.plusButton}
          icon="plus"
          onPress={() => setModalVisible(true)}
        />
      </Provider>
    </>
  );
}

export default Index;
