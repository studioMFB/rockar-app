import "./../styles/main.scss";
import "./../styles/customer.scss";
import { ERROR_MSG_WRONG } from "../../constants/error";
import { IProduct } from "../../server/schema/product/product.model";
import { useQuery, gql } from '@apollo/client';


const TYPE = "product";

const PRODUCTS_QUERY = gql`
  query getDataset($type: String!){
    dataset(type: $type) {
      __typename
      ... on Product {
        vin
        make
        colour
        model
        price
      }
    }
  }
`;

function ProductsPage() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY, {
    variables: { type: TYPE },
  });

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>{ERROR_MSG_WRONG}</p>; }

  return (<div className="container">
    {data.dataset.map((product: IProduct, index: number) => {
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
