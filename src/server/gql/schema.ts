import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { EmailAddressResolver, PostalCodeResolver, typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { CustomerTypes } from './types/customer';
import { ProductTypes } from './types/product';
import { Customer, ICustomer, } from '../objects/customer';
import { IProduct, Product } from '../objects/product';
import { GraphQLSchema } from 'graphql/type/schema';


export default class Schema {
    
    static init(): GraphQLSchema{
        const customer = new Customer();
        const product = new Product();

        const typeDefs = gql`
             type Query
             ${CustomerTypes}
             ${ProductTypes}
        `;
        
        const resolvers = {
            Query: {
                customers: customer.retrieve<ICustomer>(),
                products: product.retrieve<IProduct>(),
        
            },
            // Add the custom scalar resolvers here
            EmailAddress: EmailAddressResolver,
            PostalCode: PostalCodeResolver
        };

        const schema = makeExecutableSchema({
            typeDefs: [scalarTypeDefs, typeDefs], // Combine scalar type definitions with our own
            resolvers: resolvers,
        });

        return schema;
    }

}

// const schema = makeExecutableSchema({
//     typeDefs: [scalarTypeDefs, typeDefs], // Combine scalar type definitions with our own
//     resolvers,
// });

// export default schema;