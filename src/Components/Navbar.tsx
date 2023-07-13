import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarLinks from "./NavbarLinks";
import {
  AppBar,
  Container,
  Box,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar>
        <Toolbar sx={{ bgcolor: "#fff", color: "#000" }}>
          <Box
            component={Container}
            fixed
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography component={Link} variant="h4" to="/" color="#000">
              Brand
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <NavbarLinks />
            </Stack>

            <IconButton
              color="inherit"
              aria-label="menu"
              sx={{ display: { md: "none" } }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Stack spacing={2} width={300} p={3}>
          <NavbarLinks />
        </Stack>
      </Drawer>
    </>
  );
};

export default Navbar;
