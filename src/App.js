import React from 'react';
import ProductCard from './ProductCard'; // Importing the ProductCard component
import CartPage from './CartPage'; // Importing the CartPage component
import data from './data'; // Importing data for products
import './App.css'; // Importing CSS for the App
import { CartProvider } from './CartContext'; // Importing the CartProvider from CartContext
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importing necessary components from react-router-dom

import { useCart } from './CartContext'; // Importing the useCart hook from CartContext


// Functional component for the Navbar
const Navbar = () => {
  const { getTotalUniqueProducts } = useCart(); // Getting the total unique products from the cart context

  return (
    // Navbar with Bootstrap styling
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "rgb(255, 105, 180)" }}>
      <div className="container-fluid">
        
        {/* Brand name */}
        <h6 className="navbar-brand text-light" style={{ paddingLeft: '20px' }}>
          ShopOnline.Com
        </h6>
        {/* Navbar toggler for responsive design */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Home link */}
        <h6>
          <Link to="/" className="nav-link text-light">
            Home
          </Link>
        </h6>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">

          {/* Cart link */}
          <Link to="/cart" className="nav-link text-light">
            <i class="bi bi-bag"></i>  Bag
            {/* Badge for displaying the total unique products in the cart */}
            <span className="badge bg-dark text-white ms-1 ">{getTotalUniqueProducts()}</span>
          </Link>
          
        </div>
      </div>
    </nav>
  );
};


// Main App component
const App = () => {
  return (
    <Router> {/* Using BrowserRouter for routing */}
      <CartProvider> {/* Providing CartProvider context */}
        <div>
          {/* Navbar component */}
          <Navbar />
          <Routes> {/* Defining routes */}
            {/* Route for the home page */}
            <Route exact path="/" element={<ProductCard data={data} />} />
            {/* Route for the cart page */}
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App; // Exporting the App component
