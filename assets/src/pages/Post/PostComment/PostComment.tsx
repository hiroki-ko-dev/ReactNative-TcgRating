import React, { useState, useEffect, useContext, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { GiftedChat, Bubble, IMessage, InputToolbar } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import postCommentStyles from './PostComment.style';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { APP_URL } from "../../../config";
import { PostCommentType } from '../type';

type PostCommentProps = {
  postId: number;
  setIsLoadingStatus: (status: boolean) => void;
  setExpanded: (status: boolean) => void;
};

const PostComment: React.FC<PostCommentProps> = ({ postId, setIsLoadingStatus, setExpanded }) => {
  const authContext = useContext(AuthContext);
  const { loginUser } = authContext;
  if (!loginUser) {
    return <></>
  }
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const messagesData = await API.graphql(graphqlOperation(listMessages)) as { data: { listMessages: { items: Item[] } } };
      const mappedItems: IMessage[] = messagesData.data.listMessages.items.map(item => {
        return {
          _id: Math.round(Math.random() * 100000000),
          text: item.text,
          createdAt: new Date(item.createdAt),
          user: { 
            _id: item.userId,
            name: item.name,
            avatar: item.imagePath,
          },
        };
      });
      setMessages(previousMessages => GiftedChat.append(previousMessages, mappedItems));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (newMessage: IMessage[] = []) => {
    const messageDetails = {
      userId: loginUser.user.id,
      text: newMessage[0].text,
      name: loginUser.user.name,
      imagePath: 'https://pbs.twimg.com/profile_images/1682779789340585984/1qM80E63_400x400.jpg'
    };
    try {
      await API.graphql(graphqlOperation(createMessage, { input: messageDetails }));
      setTimeout(fetchMessages, 500);
      fetchMessages();  // Fetch messages again after a new one has been created
      console.log('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => sendMessage(newMessage)}
      placeholder="テキストを入力してください"
      user={{ 
        _id: loginUser.user.id,
        name: loginUser.user.name,
      }}
    />
  );
};

export default PostComment;
