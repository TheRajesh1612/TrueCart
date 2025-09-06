import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({children}) =>{
  const [cart, setCart] = useState([]);


const addToCart = (item) => {
  // Check if item already exists in cart
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    // If item exists, increase quantity
    setCart(prevCart => 
      prevCart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
    toast.success(`Quantity of ${item.model || item.title || item.brand} increased in cart!`, {
      toastId: `add-${item.id}`,
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    // If item doesn't exist, add it with quantity 1
    setCart(prevCart => [...prevCart, { ...item, quantity: 1 }]);
    toast.success(`${item.model || item.title || item.brand} added to cart!`, {
      toastId: `add-${item.id}`,
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

const removeFromCart = (item) => {
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem && existingItem.quantity > 1) {
    // If quantity is more than 1, decrease quantity
    setCart(prevCart => 
      prevCart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
    toast.info(`Quantity of ${item.model || item.title || item.brand} decreased in cart!`, {
      toastId: `remove-${item.id}`,
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    // If quantity is 1 or item doesn't exist, remove completely
    setCart(prevCart => prevCart.filter((cartItem) => cartItem.id !== item.id));
    toast.warning(`${item.model || item.title || item.brand} removed from cart!`, {
      toastId: `remove-${item.id}`,
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

const removeItemCompletely = (item) => {
  setCart(prevCart => prevCart.filter((cartItem) => cartItem.id !== item.id));
  toast.error(`${item.model || item.title || item.brand} completely removed from cart!`, {
    toastId: `remove-complete-${item.id}`,
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

// Calculate total items in cart
const getTotalItems = () => {
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

return (
  <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeItemCompletely, getTotalItems }}>
    {children}
  </CartContext.Provider>
)

}

export const useCart = () => {
  return useContext(CartContext);
}