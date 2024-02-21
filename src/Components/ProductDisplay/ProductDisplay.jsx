import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return null; // Or render some placeholder content
    }

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

  return (
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className='productdisplay-img-list'>
                <img src={product.image} alt='' />
                <img src={product.image} alt='' />
                <img src={product.image} alt='' />
                <img src={product.image} alt='' />
            </div>
            <div className='productdisplay-img'>
                <img className='productdisplay-main-img' src={product.image} alt=""/>
            </div>
        </div>
        <div className='productdisplay-right'>
            <h1>{product.productName}</h1>
            <div className='productdisplay-right-star'>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_dull_icon} alt=''/>
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old"> ${product.oldPrice} </div>
                <div className="productdisplay-right-price-new"> ${product.newPrice}</div>
            </div>
            <div className='productdisplay-right-description'>
                A lightweight, usually knitted , pullover shirt, close fitting and a round
                neckline and short sleeves, worn as an undershirt. close fitting and a round
                neckline and short sleeves, worn as an undershirt 
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className='productdisplay-right-sizes'>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <div className="productdisplay-right-quantity">
                    <h1>Quantity</h1>
                    <div className='productdisplay-right-quantity-controls'>
                        <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
                        <p>{quantity}</p>
                        <button className="quantity-btn" onClick={increaseQuantity}>+</button>
                    </div>
            </div>

            <button onClick={()=>{addToCart(product.productId, quantity)}}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category : </span>Women, T-Shirt, Crop Top</p>
            <p className='productdisplay-right-category'><span>Tags : </span>Modern, Latest</p>
        </div>
       </div>
  )
}

export default ProductDisplay