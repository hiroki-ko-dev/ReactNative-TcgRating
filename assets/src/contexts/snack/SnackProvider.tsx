import React, { useState } from "react";
import { SnackContext } from "@/contexts/snack/SnackContext";
import { Snackbar } from 'react-native-paper';

export const SnackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackMessage, setSnackMessage] = useState<string>("");

  return (
    <SnackContext.Provider value={{ snackMessage, setSnackMessage }}>
      {children}
      {snackMessage && 
        <Snackbar
          visible={!!snackMessage}
          onDismiss={() => setSnackMessage("")}
          action={{
            label: "閉じる",
            onPress: () => setSnackMessage("")
          }}
        >
          {snackMessage}
        </Snackbar>
      }
    </SnackContext.Provider>
  );
};
