import { useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";

import { get_users } from "../store/usersSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import UsersList from "../Components/UsersList";
import InfoMessage from "../Components/InfoMessage";
import ErrorMessage from "../Components/ErrorMessage";
import LoadingComponent from "../Components/LoadingComponent";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => void dispatch(get_users()), [dispatch]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!users.length) {
    return <InfoMessage>There is no users</InfoMessage>;
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
