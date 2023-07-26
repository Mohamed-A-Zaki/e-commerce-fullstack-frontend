import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import ProductList from "../Components/ProductList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { get_products } from "../store/productsSlice";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => void dispatch(get_products()), [dispatch]);

  if (loading) {
    return (
      <Typography sx={{ m: 2, textAlign: "center" }} variant="h5">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Alert sx={{ m: 2 }} severity="error">
        {error}
      </Alert>
    );
  }

  if (!products.length) {
    return (
      <Alert sx={{ m: 2 }} severity="info">
        There is no products
      </Alert>
    );
  }

  return (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>title</TableCell>
              <TableCell>description</TableCell>
              <TableCell>image</TableCell>
              <TableCell>edit</TableCell>
              <TableCell>delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ProductList products={products} />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Products;
