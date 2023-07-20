import { TableRow, TableCell } from "@mui/material";

import EditButton from "./EditButton";
import DelteButtton from "./DelteButtton";

type Props = {
  id: number;
  index: number;
  name: string;
  email: string;
};

const UserRow = ({ id, name, email, index }: Props) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        <EditButton id={id}/>
      </TableCell>
      <TableCell>
        <DelteButtton id={id} />
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
