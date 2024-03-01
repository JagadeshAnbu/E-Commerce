  import React, {useEffect, useState } from 'react'
  import './RelatedProducts.css'
  import Item from '../Item/Item'


  const RelatedProducts = (props) => {
    const {product} = props;
    const [productsList, setProductsList] = useState([]);

    // Fetch related products when the component mounts
    useEffect(() => {
      if (product && product.productId) {
        fetch(`https://localhost:7236/api/Cart/relatedproducts/${product.productId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched products:", data);
            setProductsList(data);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      }
    }, [product]);

    return (
      <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className='relatedproducts-item'>
          {productsList.map((product, i) => (
            <Item key={i} 
                  productId={product.productId} 
                  name={product.productName} 
                  image={product.image}
                  newPrice={product.newPrice} 
                  oldPrice={product.oldPrice}/>
                  
          ))}

        </div>
      </div>
    )
  }

  export default RelatedProducts
