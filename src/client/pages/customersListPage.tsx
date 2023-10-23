import "./../styles/main.scss";
import "./../styles/customer.scss";
import { ERROR_MSG_WRONG } from "../../constants/error";
import { ICustomer } from "../../server/schema/customer/customer.model";
import { useQuery } from '@apollo/client';
import { CUSTOMERS_QUERY, TYPE } from "../../server/schema/customer/customer.queries";
import { Link } from "react-router-dom";


function CustomersListPage() {
  const { loading, error, data } = useQuery(CUSTOMERS_QUERY, {
    variables: { type: TYPE },
  });

  if (loading) { return <p>Loading...</p>; }
  if (error) {
    console.error('An error occurred:', error);
    return <p>{ERROR_MSG_WRONG}</p>;
  }

  return (<div className="container">
    {data.dataset.map((customer: ICustomer, index: number) => {
      return <div key={index} className="item customer">
        <Link className="customer" to={`/customer/${customer.forename}/${customer.surname}`}>
          <p> {customer.forename} {customer.surname}</p>
        </Link>
      </div>;
    })}
  </div>);
}

export default CustomersListPage;
