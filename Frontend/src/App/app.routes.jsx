import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Home from "../features/auth/pages/Home";
import Protected from "../features/auth/components/Protected";
import PublicRoute from "../features/auth/components/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
