import "./../styles/main.scss";
import "./../styles/customer.scss";
import { ERROR_MSG_WRONG } from "../../constants/error";
import { ICustomer } from "../../server/schema/customer/customer.model";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CUSTOMERS_QUERY } from "../../server/schema/customer/customer.queries";


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
      return <div className="item customer">
        <p key={index}>{customer.forename}</p>
        <p key={index}>{customer.surname} |</p>
        <p key={index}>{customer.email} |</p>
        <p key={index}>{customer.contactNumber} |</p>
        <p key={index}>{customer.postcode}</p>
      </div>;
    })}
  </div>);
}

export default CustomerPage;
