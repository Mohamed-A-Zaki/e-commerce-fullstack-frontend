import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

import Topbar from "../Components/Topbar";
import Sidebar from "../Components/Sidebar";
import ToastMessage from "../Components/ToastMessage";
import EditUserForm from "../Components/EditUserForm";

const Dashboard = () => {
  return (
    <>
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
      <ToastMessage />
      <EditUserForm />
    </>
  );
};

export default Dashboard;
