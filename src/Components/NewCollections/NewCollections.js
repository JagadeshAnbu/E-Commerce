import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { useState, useEffect } from 'react'

const NewCollections = () => {
  //api state
  const [products, setProducts] = useState([])
  useEffect(()=>{
            fetch("https://localhost:44346/api/Products/top4")
            .then((response)=>response.json())
            .then((data)=>setProducts(data));
  },[])

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className='collections'>
            {/* {new_collection.map((item,i)=>{
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

export default NewCollections