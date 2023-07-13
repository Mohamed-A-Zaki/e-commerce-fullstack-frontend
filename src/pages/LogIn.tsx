import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios, { AxiosResponse } from "axios";
import { AxiosError } from "axios";

import * as Yup from "yup";
import { Formik } from "formik";

import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Box, TextField, Typography } from "@mui/material";

type User = {
  id: number;
  name: string;
  email: string;
};

type Data = {
  token: string;
  user: User;
};

type Res_Data = {
  data: Data;
  message: string;
  status: string;
};

const LogIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required().min(8),
      })}
      onSubmit={async (values) => {
        try {
          const { data }: AxiosResponse<Res_Data> = await axios.post(
            "http://127.0.0.1:8000/api/login",
            values
          );
          // const { user, token } = data.data;
          console.log(data);
          localStorage.setItem("email", values.email);
          navigate("/", { replace: true });
        } catch (error) {
          const _error = error as AxiosError;
          const { status, data } = _error.response as AxiosResponse<Res_Data>;
          setError(status === 404 ? _error.message : data.message);
        }
      }}
    >
      {({ getFieldProps, handleSubmit, errors, touched, isSubmitting }) => (
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit}
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
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            type="email"
            label="Email Address"
            id="email"
            size="small"
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
            {...getFieldProps("email")}
            helperText={!!(errors.email && touched.email) && errors.email}
            error={!!(errors.email && touched.email)}
          />

          <TextField
            type="password"
            label="password"
            id="Password"
            size="small"
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
            {...getFieldProps("password")}
            helperText={
              !!(errors.password && touched.password) && errors.password
            }
            error={!!(errors.password && touched.password)}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Loadin..."
            sx={{
              display: "block",
              m: "auto",
              minWidth: 120,
              maxWidth: "100%",
            }}
          >
            Login
          </LoadingButton>
        </Box>
      )}
    </Formik>
  );
};

export default LogIn;
