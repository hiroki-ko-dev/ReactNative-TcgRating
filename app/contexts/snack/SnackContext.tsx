import { createContext } from "react";

interface SnackContextType {
  snackMessage: string;
  setSnackMessage: (msg: string) => void;
}

export const SnackContext = createContext<SnackContextType | undefined>(undefined);
