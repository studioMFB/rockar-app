import { gql } from 'apollo-server-express';
import { CustomerTypes, CustomerResolvers } from './customer/customer.index';
import { ProductTypes, ProductResolvers } from './product/product.index';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { EmailAddressResolver, PostalCodeResolver, typeDefs as scalarTypeDefs} from 'graphql-scalars';


const typeDefs = gql`
     type Query
     ${CustomerTypes}
     ${ProductTypes}
`;

const resolvers = {
    Query: {
        ...CustomerResolvers,
        ...ProductResolvers,
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