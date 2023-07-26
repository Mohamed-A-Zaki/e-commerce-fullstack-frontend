import { TableRow, TableCell, Box } from "@mui/material";

import EditButton from "./EditButton";
import DelteButtton from "./DelteButtton";

import Product from "../types/product.type";
import { useAppDispatch } from "../store/hooks";
import { delete_product } from "../store/productsSlice";

type Props = Product & {
  index: number;
};

const ProductRow = ({ id, index, description, title, image }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        <Box
          component="img"
          src={image as string}
          alt={description}
          sx={{ width: 100 }}
        />
      </TableCell>
      <TableCell>
        <EditButton id={id} />
      </TableCell>
      <TableCell>
        <DelteButtton onClick={() => void dispatch(delete_product(id))} />
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
