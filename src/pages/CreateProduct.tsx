import { useRef } from "react";
import { Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik } from "formik";

import { useAppDispatch } from "../store/hooks";
import { create_product } from "../store/productsSlice";

import FormHeading from "../Components/FormHeading";
import SubmitButton from "../Components/SubmitButton";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const file_input = useRef<null | HTMLInputElement>(null);

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        image: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required(),
        description: Yup.string().required(),
        image: Yup.string().required(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const file = (file_input.current?.files as FileList)[0];
        dispatch(create_product({ ...values, image: file }))
          .unwrap()
          .then(() => navigate("/dashboard/products"))
          .catch(() => setSubmitting(false));
      }}
    >
      {({ getFieldProps, handleSubmit, errors, touched, isSubmitting }) => (
        <Box noValidate component="form" onSubmit={handleSubmit} p={4}>
          <FormHeading>Create Product</FormHeading>

          <TextField
            type="text"
            label="Product title"
            id="title"
            fullWidth
            sx={{ mb: 2 }}
            {...getFieldProps("title")}
            helperText={!!(errors.title && touched.title) && errors.title}
            error={!!(errors.title && touched.title)}
          />

          <TextField
            type="text"
            label="Product Description"
            id="description"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
            {...getFieldProps("description")}
            helperText={
              !!(errors.description && touched.description) &&
              errors.description
            }
            error={!!(errors.description && touched.description)}
          />

          <TextField
            type="file"
            label="Product Image"
            id="image"
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            {...getFieldProps("image")}
            helperText={!!(errors.image && touched.image) && errors.image}
            error={!!(errors.image && touched.image)}
            inputRef={file_input}
          />

          <SubmitButton loading={isSubmitting}>Create</SubmitButton>
        </Box>
      )}
    </Formik>
  );
};

export default CreateProduct;
