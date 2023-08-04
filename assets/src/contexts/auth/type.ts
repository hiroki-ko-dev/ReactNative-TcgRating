export type AuthContextType = {
  loginUser: LoginUser | null;
  setLoginUser: React.Dispatch<React.SetStateAction<LoginUser | null>>;
};

export type LoginUser = {
  id: number;
  name: string;
  body: string;
  profileImagePath: string;
  birthday: Date;
  gender: string;
  rate: number;
};