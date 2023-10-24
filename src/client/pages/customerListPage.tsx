import "./../styles/main.scss";
import "./../styles/customer.scss";
import { ERROR_MSG_WRONG } from "../../constants/error";
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import { ICustomer } from "../../server/schema/customer/customer.model";
import { CUSTOMERS_NAME_QUERY } from "../../server/schema/customer/customer.queries";


function CustomerListPage() {
    const { loading, error, data } = useQuery(CUSTOMERS_NAME_QUERY);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>{ERROR_MSG_WRONG}</p>;}

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

export default CustomerListPage;
