import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { useState, useEffect } from 'react'


const NewCollections = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("https://localhost:7236/api/Cart/newcollections")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched products:", data);
        setProductsList(data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  };

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className='popular-item'>
        {productsList.map((product, index) => (
          <Item
            key={product.productId}
            productId={product.productId}
            name={product.productName}
            image={product.image}
            newPrice={product.newPrice}
            oldPrice={product.oldPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
