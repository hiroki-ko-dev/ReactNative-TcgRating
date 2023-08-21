import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import postCommentStyles from './PostComment.style';
import { APP_URL } from "@/config";
import { PostCommentType } from '../type';
import { fetchIndex, FetchIndexType } from '@/services/fetchIndex';
import { fetchStore } from '@/services/fetchStore';
import Paginator from '@/components/Paginator/Paginator';
import { useLoginUser } from '@/contexts/auth/useLoginUser';
import { useSnackbar } from '@/contexts/snack/useSnackbar';

type PostCommentProps = {
  postId: number;
  setIsLoading: (status: boolean) => void;
};

const defaultIcon = require('../../../../images/icon/default-account.png');

const PostComment: React.FC<PostCommentProps> = ({ postId, setIsLoading }) => {
  const [message, setMessage] = useState<string>('');
  const loginUser = useLoginUser();

  const path = `${APP_URL}/api/post_comment?post_id=${postId}`;
  const query = `&post_id=${postId}`;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchedData, setFetchedData] = useState<FetchIndexType<PostCommentType[], any>>(
    { data: undefined, paginate: undefined, error: undefined }
  );
  const { data: comments, paginate: paginate, error: error } = fetchedData;
  const { setSnackMessage } = useSnackbar();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchIndex<PostCommentType[], Error>(path, query, currentPage);
    setFetchedData(result);
    setIsLoading(false);
  }, [currentPage, path, query, setIsLoading]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!comments || !paginate) {
    return <></>;
  }

  const sendComment = async () => {

    const storePath = APP_URL + '/api/post_comment';
    const requestBody = JSON.stringify({
      post_id: postId,
      user_id: loginUser.user.id,
      body: message
    });

    const { data, error } = await fetchStore(storePath, requestBody);

    if (data) {
      setSnackMessage('コメントを投稿しました');
      fetchData();
    } else if (error) {
      setSnackMessage('エラー：操作に失敗しました');
    }
  }

  return (
    <View style={postCommentStyles.container}>
      <Paginator
        path={path}
        paginate={paginate}
        onNext={() => setCurrentPage(prev => prev + 1)} 
        onPrevious={() => setCurrentPage(prev => prev - 1)}
      />
      <FlatList
        data={comments}
        scrollEnabled={false}  // スクロールを無効にする
        renderItem={({ item }) => (
          <View style={postCommentStyles.commentContainer}>
            <Image 
              source={item.user.profileImagePath ? {uri: item.user.profileImagePath} : defaultIcon} 
              style={postCommentStyles.userIcon} 
            />
            <Text style={postCommentStyles.userName}>{item.user.name}</Text>
            <Text>{item.body}</Text>
            <Text style={postCommentStyles.dateText}>{item.createdAt}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Paginator
        path={path}
        paginate={paginate}
        onNext={() => setCurrentPage(prev => prev + 1)} 
        onPrevious={() => setCurrentPage(prev => prev - 1)}
      />
      <View style={postCommentStyles.inputContainer}>
      <TextInput 
        value={message}
        onChangeText={setMessage}
        placeholder="コメントを入力"
        style={postCommentStyles.input}
        multiline={true}
        numberOfLines={8}
        returnKeyType="done"
      />
        <TouchableOpacity
          onPress={sendComment}
          style={postCommentStyles.sendButton}
        >
          <Ionicons name="send" size={24} color="#000"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PostComment;
