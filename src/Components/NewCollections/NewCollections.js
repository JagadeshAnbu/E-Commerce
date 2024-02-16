import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { useState, useEffect } from 'react'

const NewCollections = () => {
  //api state
  const [new_collection, setNew_collection] = useState([])
  useEffect(()=>{
            fetch("https://localhost:7236/api/Cart/newcollections")
            .then((response)=>response.json())
            .then((data)=>setNew_collection(data));
  },[])

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className='collections'>
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.productName} image={item.image}
                newPrice={item.newPrice} oldPrice={item.oldPrice}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections