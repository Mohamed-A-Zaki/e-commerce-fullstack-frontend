import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <List sx={{ boxShadow: 1, height: "calc(100vh - 64px)" }}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("users")}>
          <ListItemText>Users</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default Sidebar;
