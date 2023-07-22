import { Box, Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetAuthData } from "../store/authSlice";

const NavbarLinks = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {/* <Box
        component={NavLink}
        to="/"
        fontSize={17}
        sx={{ "&.active": { color: "primary.main" } }}
      >
        Home
      </Box>
      <Box
        component={NavLink}
        to="/about"
        fontSize={17}
        sx={{ "&.active": { color: "primary.main" } }}
      >
        About
      </Box>
      <Box
        component={NavLink}
        to="/contact"
        fontSize={17}
        sx={{ "&.active": { color: "primary.main" } }}
      >
        Contact
      </Box> */}
      {!user ? (
        <>
          <Button variant="contained" size="small" component={Link} to="/login">
            Login
          </Button>
          <Button
            variant="contained"
            size="small"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          size="small"
          onClick={() => dispatch(resetAuthData())}
        >
          Logout
        </Button>
      )}
      <Button variant="contained" size="small" component={Link} to="/dashboard">
        Dashboard
      </Button>
    </>
  );
};

export default NavbarLinks;
