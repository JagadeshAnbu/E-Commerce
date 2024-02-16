import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const UserId = 123;

    // Get call to fetch products
    useEffect(() => {
        fetch("https://localhost:7236/api/Cart/getproducts")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched products:", data);
                setProducts(data);
                // console.log(products);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    // Function to add item to cart
    const addToCart = (productId) => {
        setCartItems((prev) => ({ ...prev, [productId]: prev[productId] ? prev[productId] + 1 : 1 }));
        fetch('https://localhost:7236/api/Cart/addtocart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, UserId: 123, Quantity: 1 })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add item to cart');
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error adding item to cart:', error));
    }

    // Function to remove item from cart
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
      

    // Function to calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // Function to calculate total cart items
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {products, getTotalCartItems, UserId, getTotalCartAmount, addToCart, cartItems, removeFromCart }
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
