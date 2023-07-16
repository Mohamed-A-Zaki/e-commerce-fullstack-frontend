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
} from "@mui/material";

import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import User from "../types/user.type";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => get_users(), []);

  function get_users() {
    axios
      .get("http://127.0.0.1:8000/api/user/show")
      .then(({ data }: AxiosResponse<User[]>) => {
        setUsers(data);
      })
      .catch((error) => {
        setError((error as Error).message);
      });
  }

  if (!users.length) {
    return (
      <Alert sx={{ m: 2 }} severity="info">
        There is no users
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert sx={{ m: 2 }} severity="error">
        {error}
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
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, name, email }, index) => {
              return (
                <TableRow key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
