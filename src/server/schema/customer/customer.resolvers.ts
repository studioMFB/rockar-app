import { DataLoader } from "../../utils/dataLoader";
import { ICustomer } from "./customer.model";


export const CustomerResolvers = {
  customers: DataLoader.fetchAll<ICustomer>('customer'),
};