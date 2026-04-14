import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  // Theme Sync
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // State Sync
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Add/Remove logic that aggregates identical items
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find(i => i._id === item._id);
      if (existing) {
        return prevCart.map(i => i._id === item._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };
  
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter(i => i._id !== itemId));
  };
  
  const updateQuantity = (itemId, delta) => {
    setCart((prevCart) => prevCart.map(i => {
      if (i._id === itemId) {
        const newQ = (i.quantity || 1) + delta;
        return newQ > 0 ? { ...i, quantity: newQ } : i;
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => setCart([]);
  const logout = () => setUser(null);

  return (
    <GlobalContext.Provider value={{ 
      user, setUser, logout, 
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      darkMode, toggleDarkMode 
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
