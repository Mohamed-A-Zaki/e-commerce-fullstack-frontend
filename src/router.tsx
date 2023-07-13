import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

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
]);

export default router;
