import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <List sx={{ boxShadow: 1, height: "calc(100vh - 64px)" }}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("users")}>
          <ListItemText>Users</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("create-user")}>
          <ListItemText>Create User</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("products")}>
          <ListItemText>Products</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("create-product")}>
          <ListItemText>Create Product</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default Sidebar;
