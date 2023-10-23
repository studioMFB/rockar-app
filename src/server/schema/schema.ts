import { gql } from 'apollo-server-express';
import { DatasetType, DatasetResolver } from './dataset/dataset.index';
import { CustomerType, CustomerResolver } from './customer/customer.index';
import { ProductType, ProductResolver } from './product/product.index';


const typeDefs = gql`
     type Query
     ${DatasetType}
     ${CustomerType}
     ${ProductType}
`;

const resolvers = {
    DatasetResult: {
        __resolveType(obj:any, contextValue:any, info:any) {
            // Only Customer has a surname field
            if (obj.surname) {
                return 'Customer';
            }
            // Only Product has a vin field
            if (obj.vin) {
                return 'Product';
            }
            return null; // GraphQLError is thrown
        }
    },
    Query: {
        ...DatasetResolver,
        ...CustomerResolver,
        ...ProductResolver,
    }
};

export {typeDefs, resolvers}