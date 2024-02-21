  import React, {useEffect, useState } from 'react'
  import './RelatedProducts.css'
  import Item from '../Item/Item'
  // import { ShopContext } from '../../Context/ShopContext'

  const RelatedProducts = (props) => {
    const {product} = props;
    const [productsList, setProductsList] = useState([]);
    // const {addToCart} = useContext(ShopContext);

    // Fetch related products when the component mounts
    useEffect(() => {
      fetch(`https://localhost:7236/api/Cart/relatedproducts/${product.productId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched products:", data);
          setProductsList(data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }, [product.productId]);

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
              {/* {Array.isArray(productsList) && productsList.map((item,i)=>{
                  return <Item key={i} id={item.id} name={item.productName} image={item.image}
                  newPrice={item.newPrice} oldPrice={item.oldPrice}/>
              })} */}
        </div>
      </div>
    )
  }

  export default RelatedProducts
