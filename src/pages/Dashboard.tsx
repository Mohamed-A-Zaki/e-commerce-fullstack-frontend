import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";

const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Topbar />
      </Grid>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
