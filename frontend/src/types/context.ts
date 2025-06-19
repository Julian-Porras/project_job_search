import type { UserType, LoginCredentials, RegisterCredentials } from './index';

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  loading: boolean;
  loggingOut: boolean;
  errors: string | null;
  login : (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout : () => Promise<void>;
  userInfo : () => Promise<UserType | null>;
}

export interface UIContextType {
    showToast : (message: string) => void; 
    hideToast : () => void;
    sideBar : boolean;
    setSideBar : (value: boolean) => void;
    subMenu : Record<string, boolean>;
    setOpenSubMenu : (key: string) => void;
    resetSubmenus : () => void;
}