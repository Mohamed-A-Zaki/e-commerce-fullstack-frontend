import { LoadingButton } from "@mui/lab";

type Props = {
  not_block?: boolean;
  loading: boolean;
  children: React.ReactNode;
};

const SubmitButton = ({ children, loading, not_block = false }: Props) => {
  return (
    <LoadingButton
      type="submit"
      variant="contained"
      loading={loading}
      loadingIndicator="Loading..."
      sx={[
        not_block || {
          display: "block",
          m: "auto",
          minWidth: 120,
          maxWidth: "100%",
        },
      ]}
    >
      {children}
    </LoadingButton>
  );
};

export default SubmitButton;
