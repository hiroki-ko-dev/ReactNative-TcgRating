import { API, graphqlOperation } from 'aws-amplify';
import { listMessages } from '../../../../src/graphql/queries';
import { IMessage } from 'react-native-gifted-chat'; 
import { Item } from './type';

export const formatMessage = (item: Item): IMessage => ({
  _id: item.id,
  text: item.text,
  createdAt: new Date(item.createdAt),
  user: { 
    _id: parseInt(item.userId, 10),
    name: item.name,
    avatar: item.imagePath,
  },
});

export const fetchMessages = async (): Promise<IMessage[]> => {
  try {
    const messagesData = await API.graphql(graphqlOperation(listMessages)) as { data: { listMessages: { items: Item[] } } };
    const messageItems: IMessage[] = messagesData.data.listMessages.items.map(
      formatMessage).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return messageItems;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

