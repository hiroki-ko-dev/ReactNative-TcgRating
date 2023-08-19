import { useContext } from "react";
import { SnackContext } from "./SnackContext";

export function useSnackbar() {
  const context = useContext(SnackContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackProvider");
  }
  return context;
}
