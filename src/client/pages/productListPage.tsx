import "./../styles/main.scss";
import { ERROR_MSG_WRONG } from "../../constants/error";
import { useQuery } from '@apollo/client';
import ProductSearch from "../components/productSearch";
import { PRODUCTS_QUERY } from "../../server/gql/queries/product";


function ProductListPage() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>{ERROR_MSG_WRONG}</p>; }

  return (<div className="container">
    <ProductSearch />
  </div>);
}

export default ProductListPage;
