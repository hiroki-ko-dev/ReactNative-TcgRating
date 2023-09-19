import { IMessage} from 'react-native-gifted-chat';

export type Item = {
  id: string;
  name: string;
  text: string;
  createdAt: number | Date;
  imagePath: string;
  userId: string;
  replyToId: string;
};

export interface ChatIMessage extends IMessage {
  replyToId?: string; // 返信先のメッセージのID
}