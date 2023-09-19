import { API, graphqlOperation } from 'aws-amplify';
import { createMessage } from '../../../src/graphql/mutations';
import { GiftedChat } from 'react-native-gifted-chat';
import { ChatIMessage } from './type';
import { LoginUser } from '../../contexts/auth/type';

type SetMessages = (messages: ((previousMessages: ChatIMessage[]) => ChatIMessage[]) | ChatIMessage[]) => void;
type SetReplyingTo = (messages: ChatIMessage | null) => void;

const sendMessage = async (
  newMessage: ChatIMessage[] = [],
  loginUser: LoginUser,
  setMessages: SetMessages,
  replyingTo: ChatIMessage | null,
  setReplyingTo: SetReplyingTo,
) => {
  const messageDetails = {
    userId: loginUser.user.id,
    text: newMessage[0].text,
    name: loginUser.user.name,
    imagePath: 'https://pbs.twimg.com/profile_images/1682779789340585984/1qM80E63_400x400.jpg',
    replyToId: replyingTo ? replyingTo._id : '',
  };

  newMessage[0].replyToId = replyingTo ? replyingTo._id.toString() : '';
  setReplyingTo(null);

  // UIを直接アップデート
  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));

  const result = API.graphql(graphqlOperation(createMessage, { input: messageDetails }));

  if (result instanceof Promise) {
    result
      .then(data => {
        // 必要に応じて、成功時の処理をここに追加
      })
      .catch(error => {
        console.error('Error sending message:', error);
        // 必要に応じてエラーハンドリングを追加
      });
  } else if ('subscribe' in result) {
    // ObservableをPromiseに変換
    new Promise((resolve, reject) => {
      result.subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      });
    })
    .then(data => {
        // 必要に応じて、成功時の処理をここに追加
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
  }
};

export default sendMessage;
