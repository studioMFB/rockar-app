import "./../styles/main.scss";
import "./../styles/customer.scss";
import { ERROR_MSG_WRONG } from "../../constants/error";
import { ICustomer } from "../../server/schema/customer/customer.model";
import { useQuery } from '@apollo/client';
import { CUSTOMER_QUERY } from "../../server/schema/customer/customer.queries";
import { useParams } from 'react-router-dom';


// Define the expected params
interface CustomerPageParams {
  [key: string]: string | undefined;
  forename: string;
  surname: string;
}

function CustomerPage() {
  const { forename, surname } = useParams<CustomerPageParams>();

  const { loading, error, data } = useQuery(CUSTOMER_QUERY, {
    variables: {
      filter: {
        forename: forename,
        surname: surname,
      },
    },
  });

  if (loading) { return <p>Loading...</p>; }
  if (error) {
    console.error('An error occurred:', error);
    return <p>{ERROR_MSG_WRONG}</p>;
  }

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
