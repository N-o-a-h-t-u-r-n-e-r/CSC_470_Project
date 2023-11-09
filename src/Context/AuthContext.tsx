import React, { createContext, useState } from "react";

type AuthContextType = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  setLoggedIn: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};