import { Box, Dialog, DialogContent, TextField, Button } from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";

import { edit_user } from "../store/usersSlice";
import { closeForm } from "../store/editFormSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import FormHeading from "./FormHeading";
import SubmitButton from "./SubmitButton";

const EditUserForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const { open } = useAppSelector((state) => state.editForm);

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
              .catch(() => setSubmitting(false));
          }}
        >
          {({ getFieldProps, handleSubmit, errors, touched, isSubmitting }) => (
            <Box noValidate component="form" onSubmit={handleSubmit}>
              <FormHeading>Edit User</FormHeading>

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

              <SubmitButton loading={isSubmitting} not_block>
                Edit
              </SubmitButton>

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
