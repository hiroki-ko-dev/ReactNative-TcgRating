import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, FlatList, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import postCommentStyles from './PostComment.style';
import { APP_URL, POKEKA_DECK_URL } from "@/app/config";
import { PostCommentType } from '../type';
import { fetchIndex, FetchIndexType } from '@/app/services/fetchIndex';
import Paginator from '@/app/components/Paginator/Paginator';
import { getDateFormat } from '@/app/utils/date';
import DeckImage from './DeckImage';

type PostCommentProps = {
  postId: number;
  setIsLoading: (status: boolean) => void;
  shouldRefetch: boolean,
  setShouldRefetch: (status: boolean) => void;
};

const defaultIcon = require('@/assets/images/icon/default-account.png');

const PostComment: React.FC<PostCommentProps> = ({ 
  postId,
  setIsLoading,
  shouldRefetch,
  setShouldRefetch,
}) => {

  const path = `${APP_URL}/api/post_comment`;
  const query = `&post_id=${postId}`;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchedData, setFetchedData] = useState<FetchIndexType<PostCommentType[], any>>(
    { data: undefined, paginate: undefined, error: undefined }
  );
  const { data: comments, paginate: paginate, error: error } = fetchedData;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchIndex<PostCommentType[], Error>(path, query, currentPage);
    setFetchedData(result);
    setIsLoading(false);
  }, [currentPage, query]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (shouldRefetch) {
      setCurrentPage(paginate?.lastPage ?? 1); 
      fetchData();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]); 

  if (!comments || !paginate) {
    return <></>;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={postCommentStyles.container}>
      <View style={postCommentStyles.container}>
        <Paginator
          path={path}
          paginate={paginate}
          onNext={() => setCurrentPage(prev => prev + 1)} 
          onPrevious={() => setCurrentPage(prev => prev - 1)}
          onFirst={() => setCurrentPage(1)}
          onLast={() => setCurrentPage(paginate.lastPage ?? 1)} 
        />
        <FlatList
          data={comments}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View>
              <View style={postCommentStyles.commentContainer}>
                <View style={postCommentStyles.noAndDateContainer}>
                  <Text style={postCommentStyles.commentNo}>
                    {item.no}. 
                  </Text>
                  <Text style={postCommentStyles.dateText}>
                    {getDateFormat(item.createdAt)}
                  </Text>
                </View>
                  <View style={postCommentStyles.userContainer}>
                    <Image
                      source={item.user.profileImagePath ? {uri: item.user.profileImagePath} : defaultIcon} 
                      style={postCommentStyles.userIcon} 
                    />
                    <Text style={postCommentStyles.userName}>{item.user.name}</Text>
                  </View>
                  <Text style={postCommentStyles.bodyText}>{item.body}</Text>
                  
              </View>
              {item.imageUrl &&
                <DeckImage
                  imageUrl={item.imageUrl}
                />
              }
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <Paginator
          path={path}
          paginate={paginate}
          onNext={() => setCurrentPage(prev => prev + 1)} 
          onPrevious={() => setCurrentPage(prev => prev - 1)}
          onFirst={() => setCurrentPage(1)}
          onLast={() => setCurrentPage(paginate.lastPage ?? 1)} 
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default PostComment;
