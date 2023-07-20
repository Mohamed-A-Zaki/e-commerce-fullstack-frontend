import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
  Box,
  Typography,
} from "@mui/material";

import { useEffect } from "react";
import UsersList from "../Components/UsersList";

import { get_users } from "../store/usersSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => void dispatch(get_users()), [dispatch]);

  if (loading) {
    return (
      <Typography sx={{ m: 2, textAlign: "center" }} variant="h5">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Alert sx={{ m: 2 }} severity="error">
        {error}
      </Alert>
    );
  }

  if (!users.length) {
    return (
      <Alert sx={{ m: 2 }} severity="info">
        There is no users
      </Alert>
    );
  }

  return (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>edit</TableCell>
              <TableCell>delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <UsersList users={users} />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
