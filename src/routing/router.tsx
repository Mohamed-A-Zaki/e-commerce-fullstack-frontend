import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import CreateUser from "../pages/CreateUser";
import RequiredAuth from "./RequiredAuth";
import Products from "../pages/Products";
import CreateProduct from "../pages/CreateProduct";
import PersistLogin from "./PersistLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PersistLogin>
        <App />
      </PersistLogin>
    ),
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
    element: (
      <PersistLogin>
        <RequiredAuth>
          <Dashboard />
        </RequiredAuth>
      </PersistLogin>
    ),
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "create-user",
        element: <CreateUser />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "create-product",
        element: <CreateProduct />,
      },
    ],
  },
]);

export default router;
