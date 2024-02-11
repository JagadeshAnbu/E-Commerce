import React, { useEffect, useState } from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'

const Popular = () => {
//api state
  const [products, setProducts] = useState([])
  useEffect(()=>{
            fetch("https://localhost:44346/api/Products/women")
            .then((response)=>response.json())
            .then((data)=>setProducts(data));
  },[])


  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className='popular-item'>
            {/* {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image}
                new_price={item.new_price} old_price={item.old_price}/>
            })} */}

          {products.map((item, i)=> {
          // if(props.category===item.category){
                  return <Item key={i} id={item.id} name={item.name} image={item.image}
                  newPrice={item.newPrice} oldPrice={item.oldPrice}/>
            // }
            // else{
            // return null;
            // }
        })}

        </div>
    </div>
  )
}

export default Popular