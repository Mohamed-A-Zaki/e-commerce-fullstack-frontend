import { TableRow, TableCell } from "@mui/material";

import EditButton from "./EditButton";
import DelteButtton from "./DelteButtton";

import User from "../types/user.type";
import { useAppDispatch } from "../store/hooks";
import { delete_user } from "../store/usersSlice";

type Props = User & {
  index: number;
};

const UserRow = ({ id, name, email, index }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        <EditButton id={id} />
      </TableCell>
      <TableCell>
        <DelteButtton onClick={() => void dispatch(delete_user(id))} />
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
