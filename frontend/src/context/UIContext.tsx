import { createContext, useContext, useState, useCallback } from "react";
import type { UIContextType } from "../types/context";

const UIContext = createContext<UIContextType | undefined>(undefined);
export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toastShow, setToastShow] = useState(false);
    const [message, setMessage] = useState("");
    const [toastStatus, setToastStatus] = useState(200);
    const [sideBar, setSideBar] = useState(true);
    const [subMenu, setSubMenu] = useState<Record<string, boolean>>({});

    const showToast = useCallback((msg: string, status: number = 200) => {
        setMessage(msg);
        setToastStatus(status);
        setToastShow(true);
    }, []);
    const hideToast = () => setToastShow(false);

    const setOpenSubMenu = (key: string) => {
        setSubMenu((prev) => {
            const isCurrentlyOpen = prev[key] === true;
            return isCurrentlyOpen ? {} : { [key]: true }; // Close all and open only this
        });
    };
    const resetSubmenus = () => setSubMenu({}); // Reset all submenus to closed

    const contextValue: UIContextType = {
        showToast,
        hideToast,
        sideBar,
        setSideBar,
        subMenu,
        setOpenSubMenu,
        resetSubmenus,
    };

    return (
        <UIContext.Provider value={contextValue}>
            {children}
        </UIContext.Provider>
    )
}

export const useUIContext = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error("useUIContext must be used within a UIProvider");
    }
    return context;
};