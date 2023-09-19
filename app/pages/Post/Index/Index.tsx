import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import { FAB, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { PostType, IndexResponseType } from '../type';
import postStyles from './Index.style';
import { RootStackParamList } from '../../Navigation/type';
import Result from './Result';
import CreateModal from './CreateModal/CreateModal';
import { APP_URL } from "@/app/config";
import { fetchIndex, FetchIndexType } from '@/app/services/fetchIndex';
import Paginator from '@/app/components/Paginator/Paginator';
import { useLoginUser } from '@/app/contexts/auth/useLoginUser';
import { useSnackbar } from '@/app/contexts/snack/useSnackbar';

const Index = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const loginUser = useLoginUser();
  const { setSnackMessage } = useSnackbar();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const path = `${APP_URL}/api/post`;
  const query = '';
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchedData, setFetchedData] = useState<FetchIndexType<PostType[], any>>(
    { data: undefined, paginate: undefined, error: undefined }
  );

  const fetchData = useCallback(async () => {
    const result = await fetchIndex<PostType[], Error>(path, query, currentPage);
    setFetchedData(result);
  }, [currentPage, path, query]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            setSnackMessage={setSnackMessage}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            fetchData={fetchData}
          />
          {(!posts) &&
            <View style={postStyles.cardContent}>
              <Text style={postStyles.cardContent}>現在スレッドがありません</Text>
            </View>
          }
          {posts.map((post: PostType) => (
            <Result
              post={post}
              navigation={navigation}
              key={post.id}
            />
          ))}
        </View>
        <View style={{ marginBottom: 100 }}>
          <Paginator
            path={path}
            paginate={paginate}
            onNext={() => setCurrentPage(prev => prev + 1)} 
            onPrevious={() => setCurrentPage(prev => prev - 1)}
            onFirst={() => setCurrentPage(1)}
            onLast={() => setCurrentPage(paginate.lastPage ?? 1)} 
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
