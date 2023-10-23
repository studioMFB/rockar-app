import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { IProduct } from '../../server/schema/product/product.model';
import { PRODUCTS_FILTER_QUERY } from '../../server/schema/product/product.queries';


function ProductSearch() {
  // Set up state for your input fields
  const [make, setMake] = useState('');
  const [colour, setColour] = useState('');
  // ...

  // When the state values change, 'useQuery' will automatically trigger a re-fetch with the new variables.
  const { loading, error, data } = useQuery(PRODUCTS_FILTER_QUERY, {
    variables: {
      filter: {
        make,
        colour,
        // ...
      },
    },
    skip: !make && !colour, //skip the query if certain conditions are met (e.g., all fields are empty)
  });

  // Handlers update the state when the user types in the input fields
  const handleMakeChange = (target: HTMLInputElement) => {
    if(target){
        setMake(target.value);
    }
  };

  const handleColourChange = (target: HTMLInputElement) => {      
      if(target){
        setColour(target.value);
    }
  };

  // ... similar handlers for other fields ...

  // Here, you might return some form of UI component to display your data or search inputs.
  return (
    <div>
      {/* Input fields for the search criteria */}
      <input type="text" placeholder="Make" value={make} onChange={(e) => handleMakeChange(e.target as HTMLInputElement)} />
      <input type="text" placeholder="Colour" value={colour} onChange={(e) => handleColourChange(e.target as HTMLInputElement)} />
      {/* ... other input fields ... */}

      <button onClick={() => { /* trigger a manual refetch or other logic if needed */ }}>
        Search
      </button>

      {/* Conditional rendering of query results */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          {/* Render your data here */}
          {data.products.map((product: IProduct, index:number) => (
            <div key={index}>
              {/* display product details */}
              <p>{product.make} | {product.colour} | {product.model} | {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductSearch;
