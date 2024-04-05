import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';

// ProductCard component
const ProductCard = ({ data }) => {
  // Using custom hook useCart to manage cart state
  const { addToCart, cartItems, removeFromCart } = useCart();
  // State to keep track of whether a product is added to cart or not
  const [addedToCartMap, setAddedToCartMap] = useState({});

  // useEffect hook to update addedToCartMap when cartItems change
  useEffect(() => {
    const newMap = {};
    // Iterating through cartItems to update addedToCartMap
    cartItems.forEach(item => {
      newMap[item.id] = true;
    });
    setAddedToCartMap(newMap);
  }, [cartItems]);
  
  // Function to handle adding a product to cart
  const handleAddToCart = (product) => {
    // Updating addedToCartMap to mark product as added
    setAddedToCartMap(prevMap => ({
      ...prevMap,
      [product.id]: true
    }));
    // Adding product to cart
    addToCart(product);
  };
  
  // Function to handle removing a product from cart
  const handleRemoveFromCart = (productId) => {
    // Updating addedToCartMap to mark product as removed
    setAddedToCartMap(prevMap => ({
      ...prevMap,
      [productId]: false
    }));
    // Removing product from cart
    removeFromCart(productId); 
  };

  // Rendering product cards
  return (
    <div className='row allcardsmap'>
      {/* Mapping through data to render individual product cards */}
      {data.map(product => {
        // Calculating discounted price
        const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));
        // Checking if product is added to cart
        const isAddedToCart = addedToCartMap[product.id];

        return (
          <div key={product.id} className="col-md-4 col-lg-4 col-sm-6 mb-3 mt-5" style={{ width: "25rem"}}>
            <div className="card h-100 maincard" style={{ width: '100%'}}>
              <img src={product.thumbnail} alt={product.title} className="card-img-top" style={{ width: '100%', height: "250px", marginBottom: '10px' }} />
              <div className="card-body p-2">
                <div className='titleRating'>
                  <h4>{product.title}</h4>
                  <span>{product.rating}</span>
                </div>
                <p>{product.description}</p>
                {/* Displaying discounted price */}
                <span><span style={{ color: "Orange", fontWeight: "600" }}>Best Price : </span> <h6>${discountedPrice.toFixed(2)}</h6> </span>
                <div className='MRPPrice'>
                  <p className='cardmrp'>MRP: <span className='pricelinethrough'>${product.price}</span></p>
                  <p style={{ color: "green", fontWeight: "600" }}>{product.discountPercentage}% Off</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  {/* Conditional rendering for add to cart or remove from cart button */}
                  {isAddedToCart ? ( 
                    <>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </>
                  ) : ( // If the product is not added to the cart, show Add to Cart button
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => handleAddToCart(product)}
                    ><i class="bi bi-bag"> </i> ADD TO BAG
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProductCard;
