import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik } from "formik";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, TextField, Typography } from "@mui/material";

import { useAppDispatch } from "../store/hooks";
import { create_user } from "./../store/usersSlice";

const CreateUser = () => {
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
      onSubmit={(values, { setSubmitting }) => {
        dispatch(create_user(values))
          .unwrap()
          .then(() => navigate("/dashboard/users"))
          .catch(() => setSubmitting(false));
      }}
    >
      {({ getFieldProps, handleSubmit, errors, touched, isSubmitting }) => (
        <Box noValidate component="form" onSubmit={handleSubmit} p={4}>
          <Typography mb={2} variant="h4" component="h1" textAlign="center">
            Create User
          </Typography>

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
              !!(errors.password_confirmation && touched.password_confirmation)
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
            Create
          </LoadingButton>
        </Box>
      )}
    </Formik>
  );
};

export default CreateUser;
