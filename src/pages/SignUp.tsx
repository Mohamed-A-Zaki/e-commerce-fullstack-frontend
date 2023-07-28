import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik } from "formik";
import axios, { AxiosResponse, AxiosError } from "axios";

import Auth_Res_Data from "../types/auth.type";
import { useAppDispatch } from "../store/hooks";
import { setAuthData } from "../store/authSlice";

import AuthForm from "../Components/AuthForm";
import FormHeading from "../Components/FormHeading";
import SubmitButton from "../Components/SubmitButton";
import ErrorMessage from "../Components/ErrorMessage";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required().min(8),
        password_confirmation: Yup.string()
          .required()
          .oneOf([Yup.ref("password")]),
      })}
      onSubmit={async (values) => {
        try {
          const { data }: AxiosResponse<Auth_Res_Data> = await axios.post(
            "http://127.0.0.1:8000/api/register",
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
        <AuthForm onSubmit={handleSubmit}>
          <FormHeading>Sign Up</FormHeading>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <TextField
            type="text"
            label="Full Name"
            id="name"
            fullWidth
            sx={{ mb: 2 }}
            {...getFieldProps("name")}
            helperText={!!(errors.name && touched.name) && errors.name}
            error={!!(errors.name && touched.name)}
          />

          <TextField
            type="email"
            label="Email Address"
            id="email"
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
            fullWidth
            sx={{ mb: 2 }}
            {...getFieldProps("password")}
            helperText={
              !!(errors.password && touched.password) && errors.password
            }
            error={!!(errors.password && touched.password)}
          />

          <TextField
            type="password"
            label="Confirm Password"
            id="confirm password"
            fullWidth
            sx={{ mb: 2 }}
            {...getFieldProps("password_confirmation")}
            helperText={
              !!(
                errors.password_confirmation && touched.password_confirmation
              ) && errors.password_confirmation
            }
            error={
              !!(errors.password_confirmation && touched.password_confirmation)
            }
          />

          <SubmitButton loading={isSubmitting}>Submit</SubmitButton>
        </AuthForm>
      )}
    </Formik>
  );
};

export default SignUp;
