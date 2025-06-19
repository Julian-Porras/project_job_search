import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { UIProvider } from "../context/UiContext";

export default function AppLayout() {
  return (
    <AuthProvider>
      <UIProvider>
        <Outlet />
      </UIProvider>
    </AuthProvider>
  );
}