import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavbarLinks = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("email"));

  function handle_logout() {
    localStorage.removeItem("email");
    setIsLogin(null);
  }

  return (
    <>
      <Box
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
      </Box>
      {!isLogin ? (
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
        <Button variant="contained" size="small" onClick={handle_logout}>
          Logout
        </Button>
      )}
    </>
  );
};

export default NavbarLinks;
