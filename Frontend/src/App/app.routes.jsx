import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Protected  from "../features/auth/components/Protected";
import PublicRoute from "../features/auth/components/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <PublicRoute>
            <Register/>
        </PublicRoute>
     
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
