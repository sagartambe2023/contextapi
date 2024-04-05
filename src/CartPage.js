import React from 'react';
import { useCart } from './CartContext';

// CartPage component
const CartPage = () => {
  // Destructuring values from useCart hook
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart(); 

  return (
    <div className="container">
      {/* Conditional rendering based on cartItems length */}
      {cartItems.length === 0 ? ( 
        // Display message if cart is empty
        <div className="mt-5 mb-5 ">
          <h1 style={{ textAlign: "center", fontSize:"20px", marginTop:"250px" }}><b>Hey,it feels so light! </b><br></br>There is nothing in your bag, add some items.</h1>
        </div>
      ) : (
        // Render cart items if cart is not empty
        <>
          {cartItems.map(item => { 
            // Calculate discounted price
            const discountedPrice = item.price - (item.price * (item.discountPercentage / 100)); 
            return (
              <div key={item.id} className="card mb-3 mt-5" style={{ fontSize: "16px" }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={item.thumbnail} alt={item.title} className="img-fluid" style={{ height: "360px" }} />
                  </div>
                  <div className="col-md-4">
                    <div className="card-body">
                      <div className='titleRating'>
                        <h5 className="card-title">{item.title}</h5>
                        <h6 className="card-title">{item.rating}</h6>
                      </div>
                      <p className="card-text">{item.description}</p>
                      {/* Buttons to increase and decrease quantity */}
                      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="btn btn-outline-primary btn-sm ms-2" onClick={() => increaseQuantity(item.id)}>+</button>
                      <br />
                      <br />
                      {/* Display discounted price, original price, and discount percentage */}
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <p className='cartspecialprice'>${discountedPrice.toFixed(2)} </p>
                        <p className="card-text cartprice"> ${item.price}</p>
                        <p className="card-text cartpercent" style={{ color:"orange"}}> ({item.discountPercentage}%)</p>
                      </div>
                      {/* Display savings */}
                      <p className='cartsaving'>Saved on this:  ${((item.quantity * item.price) - (item.quantity * discountedPrice)).toFixed(2)}</p>
                      <hr />
                      <div className="d-flex align-items-center">
                        <div style={{ marginLeft: "10px" }}>
                          {/* Display total price */}
                          <p style={{ color:"rgb(255, 105, 180)", fontWeight:"600",fontSize:"20px" }}><span className='totaldetails'> Best Price: </span>${(item.quantity * discountedPrice).toFixed(2)}</p>
                        </div>
                        {/* Button to remove item from cart */}
                        <button className="btn btn-danger ms-auto" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Button to place order */}
          <div className="pt-3 mt-5" style={{ display: "flex"}}>
            <button className="btn btn-dark" > PLACE ORDER</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
