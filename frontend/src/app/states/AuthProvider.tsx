"use client";

import React, { createContext, useEffect, useState } from "react";
import { getLogged } from "../services/auth";

interface IAuthContext {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  user: "",
  setUser: () => {},
});

const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const checkLogged = async () => {
      try {
        const logged = await getLogged();
        if (logged) {
          setUser(logged);
        }

        console.log(logged);
      } catch (error) {
        console.log(error);
      }
    };
    checkLogged();
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
