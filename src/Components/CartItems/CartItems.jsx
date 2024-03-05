
import React, { useContext, useEffect } from 'react';
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const CartItems = () => {
  const { getTotalCartAmount, cartItems, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);

  const increaseQuantity = (productId) => {
    updateCartItemQuantity(productId, cartItems[productId].quantity + 1);
  };

  const decreaseQuantity = (productId) => {
    if (cartItems[productId].quantity > 1) {
      updateCartItemQuantity(productId, cartItems[productId].quantity - 1);
    }
  };

  useEffect(() => {
    // Fetch cart items initially or when cartItems context state changes
    // fetchCartItems();
  }, [cartItems]); 

  return (
    <div className='cartitems'>
      {/* Cart item list */}
      <div className='cartitems-format-main'>
        {/* Cart item headers */}
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {/* Render cart items */}
      {Object.keys(cartItems).map((productId) => {
        const cartItem = cartItems[productId];
        return (
          <div key={cartItem.cartItemId}>
            <div className="cartitems-format cartitems-format-main">
              <img src={cartItem.product.image} alt="" className='carticon-product-icon' />
              <p>{cartItem.product.productName}</p>
              <p>RS {cartItem.product.newPrice}</p>
              <div className="productdisplay-right-quantity">
                <div className='productdisplay-right-quantity-controls'>
                  <button className="quantity-btn" onClick={() => decreaseQuantity(productId)}>-</button>
                  <p>{cartItem.quantity}</p>
                  <button className="quantity-btn" onClick={() => increaseQuantity(productId)}>+</button>
                </div>
              </div>
              <p>RS {cartItem.product.newPrice * cartItem.quantity}</p>
              <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(productId) }} alt="" />
            </div>
          </div>
        );
      })}
      {/* Cart totals */}
      <div className='cartitems-down'>
        {/* Total amount */}
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            {/* Subtotal */}
            <div className='cartitems-total-item'>
              <p>Subtotal</p>
              <p>RS {getTotalCartAmount()}</p>
            </div>
            <hr />
            {/* Shipping fee */}
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            {/* Total amount */}
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>RS {getTotalCartAmount()}</h3>
            </div>
          </div>
          {/* Proceed to checkout button */}
          <Link to='/checkout'> <button>PROCEED TO CHECKOUT</button></Link> 
        </div>
        {/* Promo code */}
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type='text' placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
