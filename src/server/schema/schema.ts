import { gql } from 'apollo-server-express';
import { DatasetType, DatasetResolver } from './dataset/dataset.index';
import { CustomerType, CustomerResolver } from './customer/customer.index';
import { ProductType, ProductResolver } from './product/product.index';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { EmailAddressResolver, PhoneNumberResolver, PostalCodeResolver, typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { DataLoader } from '../utils/dataLoader';
import { ERROR_MSG_DATA_FETCH, ERROR_MSG_FILTER, ERROR_MSG_RESOLVER } from '../../constants/error';
import { ICustomer } from './customer/customer.model';


const typeDefs = gql`
     type Query
     ${DatasetType}
     ${CustomerType}
     ${ProductType}
`;

const resolvers = {
    // Using the higher-order function to create resolvers
    // customers: fetchAll<ICustomer>('Customer'),
    // products: createResolver<IProduct>('Product'),

    DatasetResult: {
        __resolveType(obj: any, contextValue: any, info: any) {
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
    },
    // Add the custom scalar resolvers here
    EmailAddress: EmailAddressResolver,
    PhoneNumber: PhoneNumberResolver,
    PostalCode: PostalCodeResolver
};

const schema = makeExecutableSchema({
    typeDefs: [scalarTypeDefs, typeDefs], // Combine scalar type definitions with our own
    resolvers,
});

export default schema;