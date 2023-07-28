import { AppBar, Box, Container, Toolbar } from "@mui/material";
import React from "react";

type Props = {
  fixed?: boolean;
  children: React.ReactNode;
};

const MainNavbar = ({ children, fixed }: Props) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ bgcolor: "#fff", color: "#000" }}>
        <Box
          component={Container}
          fixed={fixed}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {children}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
