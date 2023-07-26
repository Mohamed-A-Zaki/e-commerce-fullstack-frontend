import Product from "../types/product.type";
import ProductRow from "./ProductRow";

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  return (
    <>
      {products.map((product, index) => {
        return <ProductRow key={product.id} {...product} index={index} />;
      })}
    </>
  );
};

export default ProductList;
