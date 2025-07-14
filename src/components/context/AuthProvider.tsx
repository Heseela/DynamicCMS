import { createContext, type PropsWithChildren, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";


type TAuthContext = {
    access_token: string | null;
    setAuth: React.Dispatch<React.SetStateAction<string | null>>;
};

const authDefaultValue: TAuthContext = {
    access_token: null,
    setAuth: () => { },
};

const AuthContext = createContext<TAuthContext>(authDefaultValue);

interface Props extends PropsWithChildren { }

export const AuthProvider = ({ children }: Props) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider
            value={{
                access_token: accessToken,
                setAuth: setAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export type TAuthPayload = {
    email: string;
    name: string;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error("Please use this hook inside the context provider.");

    const payload: TAuthPayload | null = !context.access_token
        ? null
        : jwtDecode(context.access_token);
    return {
        ...context,
        payload,
    };
};
