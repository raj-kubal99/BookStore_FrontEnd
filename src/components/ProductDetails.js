import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import imgg from "../images/book1.jpg"
import '../index.css';

const ProductDetails = ({cartItems, setCartItems, addedToCart, setAddedToCart}) => {

    const [books,setBooks]=useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const { id } = useParams();
    
    // Add to Cart Function
    const handleCartItems= (item) => { 
        setCartItems(cartItems => [...cartItems, {...item, quantity:1}]);
        setAddedToCart(prevState => ({
            ...prevState,[item.id]:true
        }));

        setShowSuccessMessage(true);
        setTimeout(() => {
        setShowSuccessMessage(false);
        }, 2000);  
    };

    const deleteCartItems = (item) => {
        setCartItems(cartItems.filter(Items => Items.id != item.id)); 
        setAddedToCart(prevState => {
            const newState= {...prevState};
            delete newState[item.id];
            return newState;
        });

        setShowDeleteMessage(true);
        setTimeout(() => {
        setShowDeleteMessage(false); //Display Message for 2 sec
        }, 2000);
    }

    /**
     * GET Request
     * headers: {'content-type':'application/json'}
     * Request URL: http://localhost:8080/productinfo/<book id>
     * Response Body: 
     *  {
     *      Id,Bookname,Author,Price,BookSummary,Ratings
     *  }
     */
    useEffect(() => {  
        fetch('http://localhost:8080/productinfo/'+id,{method:'GET',headers:{'content-type':'application/json'}})
            .then(res => {
                if (!res.ok){
                    throw Error('Could not fetch data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setBooks(data?.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (  
        <div className="productInfo">
            {books?.map((book)=>(
                <div className="container mt-5">
                    <h2 className="mb-4">Product Details</h2>
                    
                    {showDeleteMessage && (
                        <div className="alert alert-success mt-3" role="alert">
                            Item removed from cart successfully!
                        </div>
                    )}

                    {showSuccessMessage && (
                        <div className="alert alert-success mt-3" role="alert">
                            Item added to cart successfully!
                        </div>
                    )}

                    <div className="row">
                        <div className="col-md-6">
                            <img src={imgg} alt="Product" className="img-fluid custom-img-style"/>
                        </div>
                        <div className="col-md-6">
                            <h2>{book.bookname}</h2>
                            <p>{book.BookSummary}</p>
                            <p>Author: {book.author}</p>
                            <p>Rating: {book.Ratings} of 5</p>
                            {!addedToCart[book.id] && (<button className="btn btn-primary me-2" onClick={() => handleCartItems(book)}>Add to Cart</button>)}
                            {addedToCart[book.id] && (<button className="btn btn-light me-2" onClick={() => deleteCartItems(book)}>Remove from Cart</button>)}
                            <Link to="/" class="btn btn-secondary">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default ProductDetails;