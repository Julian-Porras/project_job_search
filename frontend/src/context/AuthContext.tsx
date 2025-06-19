import { createContext, useContext, useState, useEffect } from "react";
import { loginApi, registerApi, userInfoApi, logoutApi } from "../api/authApi";
import type { LoginCredentials, RegisterCredentials } from "../types/index";
import type { UserType } from "../types/index";
import type { AuthContextType } from "../types/context";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loggingOut, setLoggingOut] = useState<boolean>(false);
    const [errors, setErrors] = useState<string | null>(() => null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && !user) {
            userInfo()
        }
    }, [token, user]);

    const login = async (credentials: LoginCredentials) => {
        setLoading((_prev) => true);
        setErrors((_prev) => null);
        try {
            const data = await loginApi(credentials);
            const bearer = data.token;
            localStorage.setItem("token", bearer);
            setToken((_prev) => bearer);
            setErrors((_prev) => null);
            const userData = await userInfo();
            if (userData) {
                navigate("/dashboard");
            }
            else {
                navigate("/");
            }
        } catch (err: string | any) {
            const status = err.response?.status;
            setErrors(
                status === 422 || status === 401
                    ? err.response.data.errors
                    : { general: "Something went wrong" }
            );
        } finally {
            setLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        setLoading((_prev) => true);
        setErrors((_prev) => null);
        try {
            const data = await registerApi(credentials);
            console.log(data);
            const bearer = data.token;
            localStorage.setItem("token", bearer);
            setToken((_prev) => bearer);
            setErrors((_prev) => null);
            const userData = await userInfo();
            if (userData) {
                navigate("/dashboard");
            }
            else {
                navigate("/");
            }
            // switch (userData.role_id) {
            //     case ROLES.ADMIN:
            //         navigate("/admin/dashboard");
            //         break;
            //     case ROLES.INSTRUCTOR || ROLES.DEVELOPER:
            //         navigate("/instructor/dashboard");
            //         break;
            //     case ROLES.STUDENT:
            //         navigate("/student/dashboard");
            //         break;
            //     default:
            //         navigate("/");
            // }
        } catch (err: string | any) {
            const status = err.response?.status;
            setErrors(
                status === 422 || status === 401
                    ? err.response.data.errors
                    : { general: "Something went wrong" }
            );
        } finally {
            setLoading(false);
        }
    };

    const userInfo = async () => {
        try {
            const data = await userInfoApi();
            setUser(data);
            localStorage.setItem("code", data.role_id || "");
            return data;
        } catch {
            logout();
        }
    };

    const logout = async () => {
        setLoggingOut((_prev) => true);
        try {
            await logoutApi();
        } catch (err: string | any) {
            const status = err.response?.status;
            setErrors(
                status === 422 || status === 401
                    ? err.response.data.errors
                    : { general: "Something went wrong" }
            )
        } finally {
            localStorage.clear();
            setLoggingOut((_prev) => false);
            setToken((_prev) => null);
            setUser((_prev) => null);
            navigate("/");
        }
    };

    const contextValue: AuthContextType = {
        token,
        setToken,
        user,
        setUser,
        loading,
        loggingOut,
        errors,
        login,
        register,
        logout,
        userInfo,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};