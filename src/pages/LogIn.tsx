import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios, { AxiosResponse, AxiosError } from "axios";

import * as Yup from "yup";
import { Formik } from "formik";

import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Box, TextField, Typography } from "@mui/material";

import Auth_Res_Data from "../types/auth.type";
import { useAppDispatch } from "../store/hooks";
import { setAuthData } from "../store/authSlice";

const LogIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        email: "mohsen@gmail.com",
        password: "123123123",
      }}
      validationSchema={Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required().min(8),
      })}
      onSubmit={async (values) => {
        try {
          const { data }: AxiosResponse<Auth_Res_Data> = await axios.post(
            "http://127.0.0.1:8000/api/login",
            values
          );
          dispatch(setAuthData(data.data));
          navigate("/", { replace: true });
        } catch (error) {
          const _error = error as AxiosError;
          const { status, data } =
            _error.response as AxiosResponse<Auth_Res_Data>;
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
