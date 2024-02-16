import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';

const ShopCategory = (props) => {
  const { products } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt='' />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='shopcategory-sort'>
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      
      <div className='shopcategory-products'>
          {products.map((product, i)=>{
              if(props.category === product.category){
                return <Item key={i} 
                             productId={product.productId} 
                             name={product.productName} 
                             image={product.image}
                             newPrice={product.newPrice} 
                             oldPrice={product.oldPrice}/>
              } else {
                return null;
              }
          })}
      </div>

      <div className='shopcategory-loadmore'>
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
