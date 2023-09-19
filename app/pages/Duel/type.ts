export type event = {
  id: number;
  status: string;
  regulation_type: number;
  card_type: number;
  user: {
    id: number;
    name: string;
  }
  duels: {
    id: number;
    room_id: number;
    duelUsers: {
      id: number;
      users: {
        id: number;
        name: string;
        profileImagePath: string;
      }
      duelUserResults?: {
        result: number;
        rating: number;
      }
    }
  }
};