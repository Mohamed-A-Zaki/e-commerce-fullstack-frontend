import { Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik } from "formik";

import { useAppDispatch } from "../store/hooks";
import { create_user } from "../store/usersSlice";

import FormHeading from "../Components/FormHeading";
import SubmitButton from "../Components/SubmitButton";

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
          <FormHeading>Create User</FormHeading>

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

          <SubmitButton loading={isSubmitting}>Create</SubmitButton>
        </Box>
      )}
    </Formik>
  );
};

export default CreateUser;
