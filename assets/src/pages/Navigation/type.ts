import { PostType} from '../Post/type';

export type RootStackParamList = {
  一覧: undefined;
  スレッド: { post: PostType };
};