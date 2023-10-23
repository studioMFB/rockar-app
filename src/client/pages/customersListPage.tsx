import "./../styles/main.scss";
import "./../styles/customer.scss";
import { ERROR_MSG_WRONG } from "../../constants/error";
import { ICustomer } from "../../server/schema/customer/customer.model";
import { useQuery } from '@apollo/client';
import { CUSTOMERS_QUERY } from "../../server/schema/customer/customer.queries";
import { Link } from "react-router-dom";


function CustomersListPage() {
    const { loading, error, data } = useQuery(CUSTOMERS_QUERY);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>{ERROR_MSG_WRONG}</p>; }

  return (<div className="container">
     {data.customers.map((customer: ICustomer, index:number) => {
      return <div className="item customer">
         <div key={index}>
          <Link className="customer" to={`/customer/${customer.forename}/${customer.surname}`}>
             <p> {customer.forename} {customer.surname}</p>
          </Link>
        </div>
          </div>;
        })}
  </div>);
}

export default CustomersListPage;
