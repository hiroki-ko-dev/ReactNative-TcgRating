import { APP_URL } from "../../../config";
import { PostType } from '../type';

type SetPosts = (posts: PostType[]) => void; // 'any' は適切な型に置き換えるべきです。
type SetMessage = (message: string) => void;
type SetSnackVisible = (isVisible: boolean) => void;

export default function getPosts(
  setPosts: SetPosts, 
  setMessage: SetMessage, 
  setSnackVisible: SetSnackVisible
){
  fetch(APP_URL + '/api/post', {method: 'GET'})
    .then(res => res.json())
    .then(response => {
      if (response.code === 200)  {
        setPosts(response.data.paginate.data)
      } else {
        setMessage(response.message);
        setSnackVisible(true)
      }
    })
    .catch((error) => {
      setMessage('エラー：操作に失敗しました');
      setSnackVisible(true)
    })
}