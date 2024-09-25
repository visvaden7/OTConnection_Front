import {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import {Nullable} from "../@types/global.ts";
import {User} from "../@types/user.ts";
import checkSessionAPI from "../utils/checkiSessionAPI.ts";

interface AuthContextType {
  user: Nullable<User>;
  setUser: Dispatch<SetStateAction<Nullable<User>>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  checkSession(): Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Nullable<User>>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkSession = async () => {
    try {
      const sessionUser = await checkSessionAPI(); // checkSessionAPI 는 사용자 정의 함수로 구현 필요
      console.log(sessionUser);
      if (sessionUser) {
        setUser(sessionUser);
      } else {
        setUser(null);
      }
    } catch (err){
      console.error(err)
    }
  };

  useEffect(() => {
    void checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isModalOpen, setIsModalOpen, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};

// 컨텍스트를 사용하는 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};