import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch } from "../store/hooks";
import { get_user } from "../store/editUserSlice";

type Props = {
  id: number;
};

const EditButton = ({ id }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      color="primary"
      aria-label="edit"
      onClick={() => void dispatch(get_user(id))}
    >
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
