import React,{createContext, useState, useEffect} from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart ={};
    for(let index = 0; index < all_product.length+1; index++){
        cart[index]=0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{
    //const [products] = useState([]);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState(getDefaultCart()); 
    // console.log('productsproductsproducts', products);
    
    //Getcall 
    useEffect(() => {
        // Fetch product data from API when component mounts
            fetch("https://localhost:44346/api/Products")
            .then((response) => response.json())
            .then((data) => {setProducts(data); })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    
    // const addToCart = (id) =>{
    //     setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))

    //     fetch('https://localhost:44346/api/Cart', 
    //     {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({ id, Name, new_price, quantity }), // Adjust quantity as needed
    //     })
    //     .then((response)=>response.json())
    //     .then((data)=>console.log(data))
    //     .catch((error) => console.error('Error adding item to cart:', error));
    //     // console.log(cartItems);
    // }

    //addtocart post call
    const addToCart = (id, name, newPrice) => {
        console.log(newPrice);
        setCartItems((prev) => ({ ...prev, [id]: prev[id] ? prev[id] + 1 : 1 }));
        
        fetch('https://localhost:44346/api/Cart/addToCart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, newPrice, quantity:1}), // Assuming quantity is always 1
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
    
            
        const removeFromCart = (itemId) => {
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
            const updatedCartItems = { ...cartItems };
            delete updatedCartItems[itemId]; // Remove the item with the specified id from the cartItems object
            setCartItems(updatedCartItems);
        
            fetch(`https://localhost:44346/api/Cart/removeFromCart/${itemId}`, { // Assuming you have an API endpoint for removing items from the cart
                method: 'DELETE',
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to remove item from cart');
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error removing item from cart:', error));
        }
        


    const getTotalCartAmount=()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem =0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }
    console.log('products : ', products);
    const contextValue = {getTotalCartItems, getTotalCartAmount, products,addToCart, cartItems, removeFromCart}
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

