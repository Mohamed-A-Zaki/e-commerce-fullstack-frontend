import { useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";

import { get_products } from "../store/productsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import ProductList from "../Components/ProductList";
import InfoMessage from "../Components/InfoMessage";
import ErrorMessage from "../Components/ErrorMessage";
import LoadingComponent from "../Components/LoadingComponent";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => void dispatch(get_products()), [dispatch]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!products.length) {
    return <InfoMessage>There is no products</InfoMessage>;
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
