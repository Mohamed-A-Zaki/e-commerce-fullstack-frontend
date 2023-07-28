import { Alert } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const ErrorMessage = ({ children }: Props) => {
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {children}
    </Alert>
  );
};

export default ErrorMessage;
