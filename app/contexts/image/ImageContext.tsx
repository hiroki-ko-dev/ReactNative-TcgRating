import { createContext } from "react";

interface ImageContextType {
  imageUrl: string;
  setImageUrl: (msg: string) => void;
}

export const ImageContext = createContext<ImageContextType | undefined>(undefined);
