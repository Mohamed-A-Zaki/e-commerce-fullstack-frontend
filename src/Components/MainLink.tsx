import { Button } from "@mui/material";
import { Link, To } from "react-router-dom";

type Props = {
  to: To;
  children: React.ReactNode;
};

const MainLink = ({ children , to}: Props) => {
  return (
    <Button variant="contained" size="small" component={Link} to={to}>
      {children}
    </Button>
  );
};

export default MainLink;
