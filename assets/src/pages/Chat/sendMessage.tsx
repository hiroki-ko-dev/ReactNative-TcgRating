import { API, graphqlOperation } from 'aws-amplify';
import { createMessage } from '../../../../src/graphql/mutations';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { LoginUser } from '../../contexts/auth/type';

type SetMessages = (messages: ((previousMessages: IMessage[]) => IMessage[]) | IMessage[]) => void;
type SetMessageAnimation = React.Dispatch<React.SetStateAction<boolean>>;

const sendMessage = async (
  newMessage: IMessage[] = [],
  loginUser: LoginUser,
  setMessages: SetMessages,
  setMessageAnimation: SetMessageAnimation
) => {
  const messageDetails = {
    userId: loginUser.user.id,
    text: newMessage[0].text,
    name: loginUser.user.name,
    imagePath: 'https://pbs.twimg.com/profile_images/1682779789340585984/1qM80E63_400x400.jpg'
  };

  try {
    await API.graphql(graphqlOperation(createMessage, { input: messageDetails }));
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
    setMessageAnimation(prev => !prev); // トグルする
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export default sendMessage;
