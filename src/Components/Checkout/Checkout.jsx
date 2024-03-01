import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getTotalCartAmount, removeFromCart } = useContext(ShopContext);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleProceedToPayment = () => {
    console.log("Proceeding to payment...");
    // Implement logic to proceed to the payment process
  };

  // Mock payment details
  const paymentDetails = [
    { method: 'GPay', details: 'example@gpay.com' },
    { method: 'PhonePe', details: '9876543210' },
    { method: 'UPI ID', details: 'example@upi' },
    { method: 'Barcode', image: 'https://postimg.cc/xqPXz4pZ' }
  ];

  return (
    <div className='checkout'>
      <h2>Checkout</h2>
      <table className='checkout-table'>
        <thead>
          <tr>
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
      <p>Total Amount: ${getTotalCartAmount()}</p>
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
        <button onClick={handleProceedToPayment}>PROCEED TO PAYMENT</button>
      </div>
    </div>
  );
};

export default Checkout;
