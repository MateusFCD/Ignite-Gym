import { UserDTO } from "@dtos/UserDTO";
import { createContext, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({
    id: "1",
    name: "Levi",
    email: "levi@gmail.com",
    avatar: "levi.png",
  });
  console.log(user);

  function signIn(email: string, password: string) {
    setUser({
      id: "",
      name: "",
      email,
      avatar: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
