import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { EmailAddressResolver, PostalCodeResolver, typeDefs as scalarTypeDefs} from 'graphql-scalars';
import { DataLoader } from '../utils/dataLoader';
import { CustomerTypes } from './types/customer';
import { ProductTypes } from './types/product';
import { ICustomer } from '../objects/customer';
import { IProduct } from '../objects/product';


const typeDefs = gql`
     type Query
     ${CustomerTypes}
     ${ProductTypes}
`;

const resolvers = {
    Query: {
        customers: DataLoader.fetchAll<ICustomer>('customer'),
        products: DataLoader.fetchAll<IProduct>('product'),

    },
    // Add the custom scalar resolvers here
    EmailAddress: EmailAddressResolver,
    PostalCode: PostalCodeResolver
};

const schema = makeExecutableSchema({
    typeDefs: [scalarTypeDefs, typeDefs], // Combine scalar type definitions with our own
    resolvers,
  });

  export default schema;