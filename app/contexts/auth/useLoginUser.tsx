import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { LoginUser } from "./type";

export function useLoginUser(): LoginUser {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  if (!context.loginUser) {
    throw new Error("loginUser is null");
  }
  return context.loginUser;
}