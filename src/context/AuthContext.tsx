import { createContext, Dispatch, FunctionComponent, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Nullable } from "../@types/global.ts";
import { User } from "../@types/user.ts";
import checkSessionAPI from "../utils/checkiSessionAPI.ts";

interface AuthContextType {
  user: Nullable<User>;
  setUser: Dispatch<SetStateAction<Nullable<User>>>;

  checkSession(): Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Nullable<User>>(null);

  const checkSession = async () => {
    const sessionUser = await checkSessionAPI(); // checkSessionAPI 는 사용자 정의 함수로 구현 필요
    console.log(sessionUser);
    if (sessionUser) {
      setUser(sessionUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkSession().then();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

