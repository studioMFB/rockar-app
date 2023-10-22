import { gql } from 'apollo-server-express';
import { CustomerType, CustomerResolver } from './customer/customer.index';


const typeDefs = gql`
     type Query
     ${CustomerType}
`;

const resolvers = {
    Query: {
        ...CustomerResolver,
    }
};

export {typeDefs, resolvers}