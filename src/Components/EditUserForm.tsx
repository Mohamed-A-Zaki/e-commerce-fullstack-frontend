import {
  Box,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";

import { get_users } from "../store/usersSlice";
import { closeForm, edit_user } from "../store/editUserSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const EditUserForm = () => {
  const dispatch = useAppDispatch();
  const { open, user } = useAppSelector((state) => state.editUser);

  return (
    <Dialog open={open} onClose={() => dispatch(closeForm())}>
      <DialogContent>
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
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
            dispatch(edit_user({ id: user.id, values: values }))
              .unwrap()
              .then(() => void dispatch(get_users()))
              .catch(() => setSubmitting(false));
          }}
        >
          {({ getFieldProps, handleSubmit, errors, touched, isSubmitting }) => (
            <Box noValidate component="form" onSubmit={handleSubmit}>
              <Typography
                variant="h4"
                component="h1"
                textAlign="center"
                sx={{ mb: 2 }}
              >
                Edit User
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
                    errors.password_confirmation &&
                    touched.password_confirmation
                  ) && errors.password_confirmation
                }
                error={
                  !!(
                    errors.password_confirmation &&
                    touched.password_confirmation
                  )
                }
              />

              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Edit
              </Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                sx={{ ml: 1 }}
                onClick={() => dispatch(closeForm())}
              >
                Close
              </Button>
            </Box>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserForm;
