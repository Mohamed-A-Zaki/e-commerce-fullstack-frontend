import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ bgcolor: "#fff", color: "#000" }}>
        <Box
          component={Container}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">Brand</Typography>
          <Button variant="contained" size="small" component={Link} to="/">
            Go to Home
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
