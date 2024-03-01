import React, { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [UserId, setUserId] = useState(null);

  // Update the updateCartItemQuantity function to accept selectedSize
  const updateCartItemQuantity = (productId, quantity) => {
    console.log(`Updating quantity of product ${productId} to ${quantity}`);
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [productId]: {
        ...prevCartItems[productId], // Preserve existing properties
        quantity: quantity,
      }
    }));
  };
    

  // Function to fetch cart items by user ID
  const getCartItemsByUserId = useCallback(() => {
    if (UserId) {
      console.log(`Fetching cart items for user ID: ${UserId}`);
      return fetch(`https://localhost:7236/api/Cart/cartitems/${UserId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch cart items');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched cart items:', data);
          // Assuming data is an array of cart items
          // Convert the array to an object where keys are product IDs
          const cartItemsObject = data.reduce((acc, item) => {
            acc[item.productId] = item;
            return acc;
          }, {});
          setCartItems(cartItemsObject);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    } else {
      return Promise.resolve(); // Return a resolved promise if UserId is not set
    }
  }, [UserId]);
  

  useEffect(() => {
    getCartItemsByUserId();
  }, [UserId, getCartItemsByUserId]);


  useEffect(() => {
    console.log('Fetching products...');
    fetch("https://localhost:7236/api/Cart/getproducts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

      const jwtToken = localStorage.getItem("jwtToken");

      if (jwtToken) {
        try {
          const decodedToken = jwtDecode(jwtToken);
          console.log("Decoded Token:", decodedToken);
          if (decodedToken && decodedToken.UserId !== undefined) {
            console.log("User ID found in decoded token:", decodedToken.UserId);
            setUserId(decodedToken.UserId);
          } else {
            console.error("User ID not found in decoded token:", decodedToken);
          }
        } catch (error) {
          console.error("Error decoding JWT token:", error);
        }
      }
    }, []);

    const addToCart = (productId, quantity, selectedSize) => {
  console.log(`Adding product ${productId} to cart with quantity ${quantity} and selected size ${selectedSize}`);
  const userId = parseInt(UserId);

  const payload = {
    userId: userId,
    productId: productId,
    quantity: quantity,
    selectedSize: selectedSize,
    Product: {
      productId: productId,
      // Other product properties here...
    }
  };

  console.log('Serialized Payload:', JSON.stringify(payload));

  fetch('https://localhost:7236/api/Cart/addtocart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    return response.json();
  })
  .then((data) => {
    if (data && data.productId) {
      console.log('Response from addToCart:', data);
      // Update the cart items state by adding the new item
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        [data.productId]: {
          productId: data.productId,
          quantity: data.quantity,
          selectedSize: data.selectedSize,
          // Other properties if needed
        }
      }));

      // Fetch updated cart items after adding to cart
        console.log('Fetching cart items after adding product...');
         getCartItemsByUserId(); // Call function to fetch cart items
         console.log(getCartItemsByUserId)
    } else {
      console.error('Invalid response received from addToCart endpoint:', data);
    }
  })
  .catch((error) => console.error('Error adding item to cart:', error));
};

    
       
  const removeFromCart = (productId) => {
    fetch(`https://localhost:7236/api/Cart/removefromcart/${productId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to remove item from cart');
        }
        console.log('Item removed from cart');
        setCartItems((prevCartItems) => {
          const updatedCartItems = { ...prevCartItems };
          delete updatedCartItems[productId];
          return updatedCartItems;
        });
      })
      .catch((error) => console.error('Error removing item from cart:', error));
  };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = all_product.find((product) => product.id === Number(item))
  //       totalAmount += itemInfo.new_price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // }


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      const cartItem = cartItems[productId];
      totalAmount += cartItem.product.newPrice * cartItem.quantity;
    }
    return totalAmount;
  };
  
  

  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       totalItem += cartItems[item];
  //     }
  //   }
  //   return totalItem;
  // }

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const productId in cartItems) {
      totalItem += cartItems[productId].quantity;
    }
    return totalItem;
  };
  

  const contextValue = {
    products,
    updateCartItemQuantity,
    getTotalCartItems,
    UserId,
    getTotalCartAmount,
    addToCart,
    cartItems,
    removeFromCart,
    getCartItemsByUserId // Add getCartItemsByUserId to context value
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
