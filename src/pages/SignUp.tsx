import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Box, Container, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [error, setError] = useState("");

  return (
    <Container
      fixed
      sx={{
        width: 600,
        maxWidth: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
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
            await axios.post("http://127.0.0.1:8000/api/register", values);
          } catch (error) {
            const message = (error as Error).message;
            if (message === "Request failed with status code 422") {
              setError("The email has already been exist.");
            } else {
              setError(message);
            }
          }
        }}
      >
        {({ getFieldProps, handleSubmit, errors, touched, isSubmitting }) => (
          <Box
            noValidate
            component="form"
            onSubmit={handleSubmit}
            sx={{ boxShadow: 3, p: 4, borderRadius: 2 }}
          >
            <Typography
              variant="h4"
              component="h1"
              textAlign="center"
              sx={{ mb: 2 }}
            >
              Sign Up
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              type="text"
              label="Full Name"
              id="name"
              size="small"
              variant="filled"
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

            <TextField
              type="password"
              label="Confirm Password"
              id="confirm password"
              size="small"
              variant="filled"
              fullWidth
              sx={{ mb: 2 }}
              {...getFieldProps("password_confirmation")}
              helperText={
                !!(
                  errors.password_confirmation && touched.password_confirmation
                ) && errors.password_confirmation
              }
              error={
                !!(
                  errors.password_confirmation && touched.password_confirmation
                )
              }
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
              Submit
            </LoadingButton>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;
