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
  const [comments, setComments] = useState<PostCommentType[]>([]);
  const [messages, setMessages] = useState<IMessage[]>(
    [{
      _id: Math.round(Math.random() * 100000000),
      text: 'aa',
      createdAt: new Date('2023-1-1'),
      user: { 
        _id: 1,
        name: 'aa',
        avatar: 'aa',
      },
    }]
  );
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const [messageAnimation, setMessageAnimation] = useState(true);
  const giftedChatRef = useRef<any>(null);

  const userContext = useContext(AuthContext);
  const { loginUser } = userContext;
  if (!loginUser) {
    throw new Error('UserContext is not provided');
  }

  useEffect(() => {
    getComments();
  }, []);
  
  useEffect(() => {
    makeJsonComments();
  }, [comments]);
  
  const getComments = () => {
    fetch(APP_URL + '/api/post_comment?post_id=' + postId, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(response => {
        if (response && response.data.paginate){
          setComments(response.data.paginate.data);
        } else {
          console.log('配列が空');
        }
        setIsLoadingStatus(false);
      });
  }
  
  const makeJsonComments = () => {
    let newMessages: IMessage[] = [];
  
    for (let i in comments) {
      let json: any = {
        _id: Math.round(Math.random() * 100000000),
        text: comments[i].body,
        createdAt: comments[i].createdAt,
        user: {
          _id: comments[i].userId,
          name: comments[i].user.name,
          avatar: comments[i].user.profileImagePath,
        },
        reply: replyMessage,
      };
      newMessages.push(json);
    }
  
    setReplyMessage(null);
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }  
 

  const onLongPress = (context: any, message: IMessage) => {
    setReplyMessage(message);
  }

  const onSend = (messages: IMessage[]) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    let json = JSON.stringify({
      post_id: postId,
      user_id: loginUser.user.id,
      body: messages[0].text,
    });

    fetch(APP_URL + '/api/post/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json
    })
      .then(res => res.json())
      .then(response => {
        setMessageAnimation(false);
      })
      .catch((error) => {
        console.log('エラー');
      })

    getComments();
  }

  const changeExpanded = (messages: any) => {
    if (messages) {
      setExpanded(false);
    }
  }

  const renderBubble = (props: any) => {
    let bubble = <Bubble {...props} wrapperStyle={{ left: { backgroundColor: 'white' } }} />

    if (messageAnimation) {
      bubble = <Animatable.View animation="bounceIn" duration={2000}>{bubble}</Animatable.View>
    }

    setMessageAnimation(true);

    return bubble;
  }

  const renderInputToolbar = (props: any) => (
    <InputToolbar {...props} containerStyle={{
      borderColor: "white",
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 5,
      paddingTop: 7,
      backgroundColor: "white"
    }} />
  );

  const renderLoading = () => <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <GiftedChat
      messages={messages}
      placeholder="テキストを入力してください"
      onSend={messages => onSend(messages)}
      user={{
        _id: loginUser.user.id,
        name: loginUser.user.name,
      }}
      renderUsernameOnMessage={true}
      renderInputToolbar={renderInputToolbar}
      onInputTextChanged={messages => changeExpanded(messages)}
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      keyboardShouldPersistTaps='handled'
      onLongPress={onLongPress}
      scrollToBottom={true}
      scrollToBottomComponent={() => { return <Ionicons name='chevron-down' size={18} /> }}
    />
  );
}

export default PostComment;
