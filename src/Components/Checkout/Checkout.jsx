import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext'; // Import ShopContext
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getTotalCartAmount, removeFromCart, getUserId, clearCart } = useContext(ShopContext); // Destructure clearCart
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleRemoveFromCart = async (productId) => {
    try {
      // Make an API call to remove the item from the cart on the server
      const response = await fetch(`https://localhost:7236/api/Cart/removefromcart/${productId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Item removed from cart successfully');
        // Update the client-side cart by calling removeFromCart from ShopContext
        removeFromCart(productId);
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };
    
  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const orderItems = Object.values(cartItems).map((cartItem) => {
        // Calculate unitPrice for the current item
        const unitPrice = cartItem.product.newPrice; // Assuming newPrice is the unit price
        
        // Calculate totalPrice for the current item
        const totalPrice = unitPrice * cartItem.quantity;
        
        // Construct the order item object including unitPrice and totalPrice
        return {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          selectedSize: cartItem.selectedSize,
          unitPrice: unitPrice,
          totalPrice: totalPrice,
        };
      });
  
      const payload = {
        UserId: getUserId(),
        OrderItems: orderItems,
        totalAmount: getTotalCartAmount(),
      };
  
      // Send the payload to the server
      const response = await fetch('https://localhost:7236/api/orders/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        console.log('Order placed successfully');
        setOrderPlaced(true); // Set orderPlaced to true
        // Reset cart after successful order
        clearCart(); // Call clearCart function
  
        // Remove items from cart on the server
        orderItems.forEach(async (item) => {
          const deleteResponse = await fetch(`https://localhost:7236/api/Cart/removefromcart/${item.productId}`, {
            method: 'DELETE',
          });
          if (deleteResponse.ok) {
            console.log(`Item ${item.productId} removed from cart on the server`);
          } else {
            console.error(`Failed to remove item ${item.productId} from cart on the server`);
          }
        });
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };
    
  
  // Mock payment details
  const paymentDetails = [
    { method: 'GPay', details: 'example@gpay.com' },
    { method: 'PhonePe', details: '9876543210' },
    { method: 'UPI ID', details: 'example@upi' },
  ];

  return (
    <div className='checkout'>
      <h1>{orderPlaced && <p>Order placed successfully!</p>}</h1>
      <h2>Checkout</h2>
      <table className='checkout-table'>
        <thead>
          <tr>
            <th>Products</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cartItems).map((productId) => {
            const cartItem = cartItems[productId];
            return (
              <tr key={productId}>
                <td><img src={cartItem.product.image} alt="" className='carticon-product-icon' /></td>
                <td>{cartItem.productId}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <button onClick={() => handleRemoveFromCart(productId)}>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Total Amount: RS {getTotalCartAmount()}</p>
      <div className="checkout-payment-options">
        <h3>Payment Options</h3>
        <ul>
          {paymentDetails.map((payment, index) => (
            <li key={index}>
              {payment.method === 'Barcode' ? (
                <div>
                  <strong>{payment.method}:</strong>
                  <img src={payment.image} alt="Barcode" />
                </div>
              ) : (
                <div>
                  <strong>{payment.method}:</strong> {payment.details}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="checkout-actions">
        <button onClick={handlePlaceOrder} disabled={isPlacingOrder}>
          {isPlacingOrder ? 'Placing Order...' : 'PLACE ORDER'}
        </button>

      </div>
    </div>
  );
};

export default Checkout;
