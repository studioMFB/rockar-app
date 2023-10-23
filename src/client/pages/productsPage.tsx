import "./../styles/main.scss";
import "./../styles/customer.scss";
import { IProduct } from "../../server/schema/product/product.model";
import { useQuery, gql } from '@apollo/client';


const PRODUCTS_QUERY = gql`
  query getProducts {
    getAllProducts{
      vin
      make
      colour
      model
      price
    }
  }
`;

function ProductsPage() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Opps, something went wrong! :(</p>; }

  return (<div className="container">
    {data.getAllCustomers.map((product: IProduct, index: number) => {
      return <div className="item products">
        <p key={index}>{product.make}</p>
        <p key={index}>{product.model}</p>
        <p key={index}>{product.colour}</p>
        <p key={index}>{product.vin}</p>
        <p key={index}>{product.price}</p>
      </div>;
    })}
  </div>);
}

export default ProductsPage;
