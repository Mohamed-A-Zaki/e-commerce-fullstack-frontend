import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "create",
        element: <CreateUser />,
      },
    ],
  },
]);

export default router;
