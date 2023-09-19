import { API, graphqlOperation } from 'aws-amplify';
import { listMessages } from '../../../src/graphql/queries';
import { ChatIMessage } from './type';

import { Item } from './type';

export const formatMessage = (item: Item): ChatIMessage => ({
  _id: item.id,
  text: item.text,
  createdAt: new Date(item.createdAt),
  user: { 
    _id: parseInt(item.userId, 10),
    name: item.name,
    avatar: item.imagePath,
  },
  replyToId:  item.replyToId,
});

export const fetchMessages = async (): Promise<ChatIMessage[]> => {
  try {
    const messagesData = await API.graphql(graphqlOperation(listMessages)) as { data: { listMessages: { items: Item[] } } };
    const messageItems: ChatIMessage[] = messagesData.data.listMessages.items.map(
      formatMessage).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return messageItems;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

