import React, { useContext } from 'react'
import'./RelatedProducts.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

const RelatedProducts = () => {
  const {products} = useContext(ShopContext);
  return (
    
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className='relatedproducts-item'>
            {products.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.productName} image={item.image}
                newrice={item.newPrice} oldPrice={item.oldPrice}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts