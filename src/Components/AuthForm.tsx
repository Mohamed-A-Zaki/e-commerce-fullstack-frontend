import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

const AuthForm = ({ children, onSubmit }: Props) => {
  return (
    <Box
      noValidate
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: 600,
        maxWidth: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: 3,
        p: 4,
        borderRadius: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default AuthForm;
