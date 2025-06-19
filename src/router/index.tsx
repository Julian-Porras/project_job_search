import { lazy, type ComponentType, Suspense, type ReactElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";


const LoginPage = lazy(() => import("../App"));

export function LazyWrapper<P extends object>(
    Component: ComponentType<P>,
    props?: P,
    fallback: ReactElement | null = null
): ReactElement {
    return (
        <Suspense fallback={fallback}>
            <Component {...(props as P)} />
        </Suspense>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: LazyWrapper(LoginPage) },
        ]
    }
]);

export default router;