import { Typography } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const FormHeading = ({ children }: Props) => {
  return (
    <Typography mb={2} variant="h4" component="h1" textAlign="center">
      {children}
    </Typography>
  );
};

export default FormHeading;
