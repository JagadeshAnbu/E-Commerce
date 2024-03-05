import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (selectedSize) {
            addToCart(product.productId, quantity, selectedSize);
        } else {
            console.log('Please select a size');
        }
    };

    const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

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
                <div className='productdisplay-right-prices'>
                    <div className='productdisplay-right-price-old'> RS {product.oldPrice} </div>
                    <div className='productdisplay-right-price-new'> RS {product.newPrice}</div>
                </div>
                <div className='productdisplay-right-description'>
                    {product.description}
                </div>

                <div className='productdisplay-right-size'>
                    <h1>Select Size</h1>
                    <div className='productdisplay-right-sizes'>
                        {availableSizes.map((size, index) => (
                            <div
                                key={index}
                                className={`size-option RS{selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelection(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                    <div className='selected-size'>
                        Selected Size: {selectedSize || 'Please select a size'}
                    </div>
                </div>

                <div className='productdisplay-right-quantity'>
                    <h1>Quantity</h1>
                    <div className='productdisplay-right-quantity-controls'>
                        <button className='quantity-btn' onClick={decreaseQuantity}>-</button>
                        <p>{quantity}</p>
                        <button className='quantity-btn' onClick={increaseQuantity}>+</button>
                    </div>
                </div>
                
                <button onClick={handleAddToCart}>ADD TO CART</button>

                <p className='productdisplay-right-category'><span>Category : </span>{product.category}</p>
                <p className='productdisplay-right-category'><span>Tags : </span>{product.tags}</p>
            </div>
        </div>
    );
}

export default ProductDisplay;
