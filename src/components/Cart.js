import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import "../index.css"

const Cart = ({cartItems, setCartItems, setAddedToCart}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderCheckout,setOrderCheckout] = useState(false);
    const [cartEmpty,setCartEmpty] = useState(false)
    
    // Handles Decrement of Quantity
    const decrementQuantity = (id) => {
       setCartItems(cartItems.map(item => 
        item.id===id?{...item, quantity: parseInt(item.quantity) > 1 ? parseInt(item.quantity) - 1 : parseInt(item.quantity)}:item
       ));
    };
    
    // Handles Increment of Quantity
    const incrementQuantity = (id) => {
      setCartItems(cartItems.map(item => 
        item.id===id?{...item, quantity: parseInt(item.quantity) < 10 ? parseInt(item.quantity) + 1 : parseInt(item.quantity)}:item
       ));
    };

    // Delete's Cart Item
    const deleteCartItem =(deleteID) => {
        setCartItems(cartItems.filter(Items => Items.id != deleteID  ));
        setAddedToCart(prevState => {
          const newState= {...prevState};
          delete newState[deleteID];
          return newState;
      });
    };

    // Calculate the Subtotal Price
    const calculateTotal = () => {
      let sum = 0;
      cartItems.forEach(item => {
        sum += parseFloat(item.price) * parseFloat(item.quantity);
      });
      return sum;
    };

    // Keep tracks of movements in Cart Items
    useEffect(() => {
      setTotalPrice(calculateTotal());        //Update the Subtotal Price
      if (cartItems.length === 0)
        setCartEmpty(true);
      else
        setCartEmpty(false);
    }, [cartItems]);

    /**
     * POST Request
     * headers: {'content-type':'application/json'}
     * Request URL: http://localhost:8080/order
     * Response Body: 
     *  {
     *      success
     *  }
     */
    const handlePost = () => {
        const dataToSend = {
          cartItems, "Amount":totalPrice
        };
        console.log(dataToSend);
        fetch('http://localhost:8080/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend) // Convert data to JSON string
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
          console.log('Response from server:', data);
          if (data==='success'){
            setCartItems([]);
            setAddedToCart({});
            setOrderCheckout(true);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });

      };

    return (  
        <div>
            <div className="container mt-5">
              <h2>Shopping Cart</h2>
              
              {/* When Cart is Empty */}
              {cartEmpty && !orderCheckout &&(
                <div className="container mt-5">
                  <div className="alert alert-info" role="alert">
                    Your cart is currently empty. Add some products to continue shopping!
                  </div>
                  <div className="text-center">
                    <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                  </div>
                </div>
              )}

              {/* When Cart is having Books */}
              {!orderCheckout && !cartEmpty && (
                <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((book)=>(
                        
                        <tr id={book.id}>
                          <td>{book.bookname}</td>
                          <td>${book.price}</td>
                          <td>
                            <div className="input-group mb-3">
                              <button className="btn btn-outline-secondary" type="button" onClick={() => decrementQuantity(book.id)}>
                                -
                              </button>
                              <input type="text" className="form-control text-center small-input" style={{ width: '1em' }} 
                              id="qtyElement" value={book.quantity} readOnly />
                              <button className="btn btn-outline-secondary" type="button" onClick={() => incrementQuantity(book.id)}>
                                +
                              </button>
                            </div>
                          </td>
                          <td>${parseFloat(book?.price)*parseInt(book?.quantity)}</td>
                          <td><button className="btn btn-danger" onClick={() => deleteCartItem(book.id)}>Delete</button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <div className="card">
                  <div className="card-body">
                    <p className="card-text"><b>Subtotal: ${totalPrice}</b></p>
                    <button className="btn btn-primary" onClick={()=> handlePost()}>Checkout</button>
                  </div>
                </div>
                </>
              )}

              {/* When Order is Placed */}
              {orderCheckout && (
                <div className="container mt-5">
                  <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Order Placed!</h4>
                    <p>Your order has been successfully placed. Thank you for shopping with us!</p>
                    <hr />
                    <p className="mb-0">You will receive a confirmation email shortly.</p>
                  </div>
                  <div className="text-center">
                    <Link to="/" className="btn btn-primary mt-3">Click To Continue Shopping</Link>
                  </div>
                </div>  
              )}

                
            </div>
        </div>
    );
}
 
export default Cart;
