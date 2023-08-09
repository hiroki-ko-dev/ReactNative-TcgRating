export type Post = {
  id: number;
  name: string;
  userId: number;
  eventId: number;
  duelId: number;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: string;
  user: {
    name: string;
    profileImagePath: string;
  }
};

export type PostCommentType = {
  id: number;
  referralId: number;
  postId: number;
  number: number;
  userId: number;
  body: string;
  imageUrl: string;
  createdAt: string;
  user: {
    name: string;
    profileImagePath: string;
  }
};