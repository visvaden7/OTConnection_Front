import React, {createContext, useEffect, useState} from "react";
import checkSessionAPI from "../utils/checkiSessionAPI.ts";

interface User {
    email: string,
    nick: string,
    avatar: string
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    checkSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    
    const checkSession = async () => {
        const sessionUser = await checkSessionAPI(); // checkSessionAPI는 사용자 정의 함수로 구현 필요
        console.log(sessionUser)
        if (sessionUser) {
            setUser(sessionUser);
        } else {
            setUser(null);
        }
    }
    
    useEffect(() => {
        checkSession()
    }, []);
    return (
        <AuthContext.Provider value={{user, setUser, checkSession}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

