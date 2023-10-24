import { ApolloServer } from "apollo-server-express/dist/ApolloServer";
import schema from "../schema";
import { CUSTOMERS_NAME_QUERY } from "./customer.queries";
import { createTestClient } from 'apollo-server-testing';


// Create a test server instance of ApolloServer for testing our GraphQL layer
const constructTestServer = () => {
  return new ApolloServer({
    schema: schema,
  }) as any;
};

describe('Queries', () => {
    it("fetches all the customers' forename and surname", async () => {
      // Construct a test server instance to mock your actual server
      const server = constructTestServer();
  
      // Use the test server to create a query function
      const { query } = createTestClient(server);
  
      // Mock an expected response (this might instead come from a mock database or mock function)
      const mockCustomerResponse = [
        { forename: 'Tom', surname: 'Harding' },
      ];
  
      const response = await query({ query: CUSTOMERS_NAME_QUERY });
      expect(response.data.customers).toEqual(mockCustomerResponse);
      expect(response.errors).toBeUndefined();
    });
  });
  