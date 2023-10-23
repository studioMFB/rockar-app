import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { IProduct } from '../../server/schema/product/product.model';
import { PRODUCTS_QUERY } from "../../server/schema/product/product.queries";
import { ERROR_MSG_WRONG } from '../../constants/error';


function ProductSearch() {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [colour, setColour] = useState('');
    const [price, setPrice] = useState('');

    // useLazyQuery returns a function that you call to execute the query
    const [getProducts, { loading, data, error }] = useLazyQuery(PRODUCTS_QUERY);

    // This function will be called when the user clicks the "Search" button
    const search = () => {
        let filter: any = {};
        if (make) filter.make = make;
        if (model) filter.model = model;
        if (colour) filter.colour = colour;
        if (price) filter.price = Number(price);

        // Execute the query manually with the current filter
        getProducts({ variables: { filter } });
    };


    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>{ERROR_MSG_WRONG}</p>; }

    return (
        <div>
            <input type="text" placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)} />
            <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
            <input type="text" placeholder="Colour" value={colour} onChange={(e) => setColour(e.target.value)} />
            <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />

            <button onClick={search}>Search</button>
            {data && (
                <div>
                    {data.products.map((product: IProduct, index: number) => {
                        return <div className="item product">
                            <p key={index}>{product.make}</p>
                            <p key={index}>{product.model}</p>
                            <p key={index}>{product.colour}</p>
                            <p key={index}>{product.vin}</p>
                            <p key={index}>{product.price}</p>
                        </div>;
                    })}
                </div>
            )}
        </div>
    );
}

export default ProductSearch;