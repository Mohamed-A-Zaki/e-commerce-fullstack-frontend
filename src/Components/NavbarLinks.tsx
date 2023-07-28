import MainLink from "./MainLink";
import { Button } from "@mui/material";

import { resetAuthData } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const NavbarLinks = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {user ? (
        <Button
          variant="contained"
          size="small"
          onClick={() => dispatch(resetAuthData())}
        >
          Logout
        </Button>
      ) : (
        <>
          <MainLink to="/login">Login</MainLink>
          <MainLink to="/signup">Signup</MainLink>
        </>
      )}
      <MainLink to="/dashboard">Dashboard</MainLink>
    </>
  );
};

export default NavbarLinks;
