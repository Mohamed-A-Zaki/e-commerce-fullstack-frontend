import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton, Stack } from "@mui/material";

import Brand from "./Brand";
import MainNavbar from "./MainNavbar";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainNavbar fixed>
        <Brand />

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
      </MainNavbar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Stack spacing={2} width={300} p={3}>
          <NavbarLinks />
        </Stack>
      </Drawer>
    </>
  );
};

export default Navbar;
