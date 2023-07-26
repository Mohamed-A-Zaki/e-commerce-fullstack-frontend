import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const DelteButtton = (props: Props) => {
  return (
    <IconButton color="error" aria-label="delete" {...props}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DelteButtton;
