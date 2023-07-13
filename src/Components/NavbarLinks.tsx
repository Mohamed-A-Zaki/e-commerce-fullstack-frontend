import { Box, Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const NavbarLinks = () => {
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
      <Button variant="contained" size="small" component={Link} to="/login">
        Login
      </Button>
      <Button variant="contained" size="small" component={Link} to="/signup">
        Signup
      </Button>
    </>
  );
};

export default NavbarLinks;
