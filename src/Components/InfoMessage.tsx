import { Alert } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const InfoMessage = ({ children }: Props) => {
  return (
    <Alert sx={{ m: 2 }} severity="info">
      {children}
    </Alert>
  );
};

export default InfoMessage;
