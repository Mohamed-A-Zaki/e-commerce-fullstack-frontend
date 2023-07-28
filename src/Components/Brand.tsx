import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Brand = () => {
  return (
    <Typography component={Link} variant="h4" to="/" color="#000">
      Brand
    </Typography>
  );
};

export default Brand;
