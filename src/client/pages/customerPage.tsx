import "./../styles/main.scss";
import "./../styles/customer.scss";
import { ERROR_MSG_WRONG } from "../../constants/error";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CUSTOMERS_QUERY } from "../../server/gql/queries/customer";
import { ICustomer } from "../../server/objects/customer";


// Define the expected params
interface CustomerPageParams {
  [key: string]: string | undefined;
  forename: string;
  surname: string;
}

function CustomerPage() {
  const { forename, surname } = useParams<CustomerPageParams>();

  const { loading, error, data } = useQuery(CUSTOMERS_QUERY, {
    variables: {
      filter: {
        forename: forename,
        surname: surname,
      },
    },
  });

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>{ERROR_MSG_WRONG}</p>; }

  return (<div className="container">
    {data.customers.map((customer: ICustomer, index: number) => {
      return <div key={index} className="item customer">
        <p>{customer.forename}</p>
        <p>{customer.surname} |</p>
        <p>{customer.email} |</p>
        <p>{customer.contactNumber} |</p>
        <p>{customer.postcode}</p>
      </div>;
    })}
  </div>);
}

export default CustomerPage;
