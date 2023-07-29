import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik } from "formik";

import { log_in } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

import AuthForm from "../Components/AuthForm";
import FormHeading from "../Components/FormHeading";
import SubmitButton from "../Components/SubmitButton";
import ErrorMessage from "../Components/ErrorMessage";

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
      onSubmit={(values, { setSubmitting }) => {
        dispatch(log_in(values))
          .unwrap()
          .then(() => navigate("/", { replace: true }))
          .catch((error) => {
            setError((error as Error).message);
            setSubmitting(false);
          });
      }}
    >
      {({ getFieldProps, handleSubmit, errors, touched, isSubmitting }) => (
        <AuthForm onSubmit={handleSubmit}>
          <FormHeading>Login</FormHeading>
          {error && <ErrorMessage>{error}</ErrorMessage>}

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

          <SubmitButton loading={isSubmitting}>Login</SubmitButton>
        </AuthForm>
      )}
    </Formik>
  );
};

export default LogIn;
