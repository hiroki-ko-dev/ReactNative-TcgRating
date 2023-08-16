import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import postCommentStyles from './PostComment.style';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { APP_URL } from "../../../config";
import { PostCommentType } from '../type';

type PostCommentProps = {
  postId: number;
  setIsLoadingStatus: (status: boolean) => void;
  setExpanded: (status: boolean) => void;
};

const defaultIcon = require('../../../../images/icon/default-account.png');

const PostComment: React.FC<PostCommentProps> = ({ postId, setIsLoadingStatus, setExpanded }) => {
  const [comments, setComments] = useState<PostCommentType[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const userContext = useContext(AuthContext);
  const { loginUser } = userContext;
  if (!loginUser) {
    throw new Error('UserContext is not provided');
  }

  useEffect(() => {
    getComments();
  }, []);
  
  const getComments = async () => {
    try {
      const res = await fetch(APP_URL + '/api/post_comment?post_id=' + postId);
      const response = await res.json();

      if (response && response.data.paginate){
        setComments(response.data.paginate.data);
      } else {
        console.log('配列が空');
      }

    } catch (error) {
      console.log('エラー:', error);
    }
    setIsLoadingStatus(false);
    setLoading(false);
  }

  const sendComment = async () => {
    try {
      const response = await fetch(APP_URL + '/api/post/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          user_id: loginUser.user.id,
          body: message
        })
      });
      if(response.ok) {
        setMessage('');
        await getComments();
      }
    } catch (error) {
      console.log('コメントの送信に失敗:', error);
    }
  }

  return (
    <View style={postCommentStyles.container}>
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
      <View style={postCommentStyles.inputContainer}>
      <TextInput 
        value={message}
        onChangeText={setMessage}
        placeholder="コメントを入力"
        style={postCommentStyles.input}
        multiline={true}
        numberOfLines={8} // これは例です。適切な行数を設定してください。
        returnKeyType="done" // キーボードのリターンキーを押したときの動作を設定します。必要に応じて変更してください。
      />
        <TouchableOpacity
          onPress={sendComment}
          style={postCommentStyles.sendButton}
        >
          <Ionicons name="send" size={24} color="#000"/>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

export default PostComment;
