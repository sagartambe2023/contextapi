import React, { createContext, useContext, useState } from 'react';

// Creating a context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider component to manage cart state and provide cart functionality
export const CartProvider = ({ children }) => {
  // State to manage cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to get total unique products in the cart
  const getTotalUniqueProducts = () => {
    return cartItems.length;
  };

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Function to increase quantity of a product in the cart
  const increaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to decrease quantity of a product in the cart
  const decreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  // Function to get total quantity of all products in the cart
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to get total amount of all products in the cart
  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price - (item.price * (item.discountPercentage / 100))) * item.quantity, 0).toFixed(2);
  };

  // Function to get total savings from all products in the cart
  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.price - (item.price * (item.discountPercentage / 100));
      const savings = item.price - discountedPrice;
      return total + savings * item.quantity;
    }, 0).toFixed(2);
  };

  // Providing cart state and functions to the context
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, getTotalQuantity, getTotalAmount, getTotalSavings, getTotalUniqueProducts }}>
      {children}
    </CartContext.Provider>
  );
};
