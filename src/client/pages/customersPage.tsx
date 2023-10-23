import "./../styles/main.scss";
import "./../styles/customer.scss";
import { ERROR_MSG_WRONG } from "../../constants/error";
import { ICustomer } from "../../server/schema/customer/customer.model";
import { useQuery, gql } from '@apollo/client';


const TYPE = "customer";

const CUSTOMERS_QUERY = gql`
  query getDataset($type: String!){
    dataset(type: $type) {
      __typename
      ... on Customer {
        forename
        surname
      }
    }
  }
`;


function CustomersPage() {
    const { loading, error, data } = useQuery(CUSTOMERS_QUERY, {
    variables: { type: TYPE },
  });

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>{ERROR_MSG_WRONG}</p>; }

  return (<div className="container">
    {data.dataset.map((customer: ICustomer, index:number) => {
          return <div className="item customer">
          <p key={index}>{customer.forename}</p>
          <p key={index}>{customer.surname}</p>
          </div>;
        })}
  </div>);
}

export default CustomersPage;
