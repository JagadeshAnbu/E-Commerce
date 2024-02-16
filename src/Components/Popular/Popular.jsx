import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = () => {
//api state
  const [popularProducts, setPopularProducts] = useState([])
  useEffect(()=>{
            fetch("https://localhost:7236/api/Cart/topwomenproducts")
            .then((response)=>response.json())
            .then((data)=>setPopularProducts(data));
  },[])


  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className='popular-item'>
          {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.productName} image={item.image}
                newPrice={item.newPrice} oldPrice={item.oldPrice}/>
            })}
        </div>
    </div>
  )
}

export default Popular