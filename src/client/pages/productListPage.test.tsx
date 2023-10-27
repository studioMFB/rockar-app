import { screen, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ProductListPage from './productListPage';
import { PRODUCTS_QUERY } from '../../server/gql/queries/product';

const mocks = [
    {
      request: {
        query: PRODUCTS_QUERY,
        variables: {
          filter: { make: "Ford" },
        },
      },
      result: {
        data: {
          products: [
            {
              vin: "WVGCV7AX7AW000784",
              make: "Ford",
              colour: "Red",
              model: "Fiesta",
              price: 10000,
              __typename: "Product",
            },
          ],
        },
      },
    },
  ];

  it('renders productListPage', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductListPage />
      </MockedProvider>
    );
  
    await waitFor(() => {
      expect(screen.getByText('Fiesta')).toBeInTheDocument();
    });
  
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });