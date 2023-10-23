import "./../styles/main.scss";
import "./../styles/customer.scss";
import { ICustomer } from "../../server/schema/customer/customer.model";
import { useQuery, gql } from '@apollo/client';


const CUSTOMERS_QUERY = gql`
  query getCustomers {
    getAllCustomers{
      forename
      surname
    }
  }
`;

function CustomersPage() {
  const { loading, error, data } = useQuery(CUSTOMERS_QUERY);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Opps, something went wrong! :(</p>; }

  return (<div className="container">
    {data.getAllCustomers.map((customer: ICustomer, index:number) => {
          return <div className="item customer">
          <p key={index}>{customer.forename}</p>
          <p key={index}>{customer.surname}</p>
          </div>;
        })}
  </div>);
}

export default CustomersPage;
