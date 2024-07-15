"use client";

import React, { createContext, useEffect, useState } from "react";
import { UserDto } from "../types/user";

interface IAuthContext {
  user: UserDto;
  setUser: React.Dispatch<React.SetStateAction<UserDto>>;
}

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  user: {} as UserDto,
  setUser: () => {},
});

const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<UserDto>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : ({} as UserDto);
    }
    return {} as UserDto;
  });

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
