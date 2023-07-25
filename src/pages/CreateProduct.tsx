import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, TextField, Typography } from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";

import { useAppDispatch } from "../store/hooks";
import { create_product } from "../store/productsSlice";

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
      onSubmit={(values) => {
        const file = (file_input.current?.files as FileList)[0];
        void dispatch(create_product({ ...values, image: file }))
          .unwrap()
          .then(() => navigate("/dashboard/products"));
      }}
    >
      {({ getFieldProps, handleSubmit, errors, touched, isSubmitting }) => (
        <Box noValidate component="form" onSubmit={handleSubmit} p={4}>
          <Typography mb={2} variant="h4" component="h1" textAlign="center">
            Create Product
          </Typography>

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

export default CreateProduct;
