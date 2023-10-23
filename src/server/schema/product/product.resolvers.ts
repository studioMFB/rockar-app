import { DataLoader } from "../../utils/dataLoader";
import { IProduct } from "./product.model";


export const ProductResolvers = {
  products: DataLoader.fetchAll<IProduct>('product'),

};
