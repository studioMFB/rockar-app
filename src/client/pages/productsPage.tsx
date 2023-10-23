import "./../styles/main.scss";
import "./../styles/product.scss";
import { ERROR_MSG_WRONG } from "../../constants/error";
import { IProduct } from "../../server/schema/product/product.model";
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from "../../server/schema/product/product.queries";
import ProductSearch from "../components/productSearch";


function ProductsPage() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>{ERROR_MSG_WRONG}</p>; }

  return (<div className="container">
    <ProductSearch />
    {/* {data.products.map((product: IProduct, index: number) => {
      return <div className="item product">
        <p key={index}>{product.make}</p>
        <p key={index}>{product.model}</p>
        <p key={index}>{product.colour}</p>
        <p key={index}>{product.vin}</p>
        <p key={index}>{product.price}</p>
      </div>;
    })} */}
  </div>);
}

export default ProductsPage;
