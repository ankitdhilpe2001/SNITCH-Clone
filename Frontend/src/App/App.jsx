import "./App.css";
import { RouterProvider} from "react-router"
import {router} from "./app.routes.jsx"
import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth.js";

const App = () => {
  const auth = useAuth();
  // hydration of the user
  useEffect( () => {
    auth.handleGetMe();
  },[])
  
  return(
    <>
      <RouterProvider router={router}/>
    </>
  )
};

export default App;
