import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../store/hooks";
import { delete_user } from "../store/usersSlice";

type Props = {
  id: number;
};

const DelteButtton = ({ id }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      color="error"
      aria-label="delete"
      onClick={() => void dispatch(delete_user(id))}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DelteButtton;
