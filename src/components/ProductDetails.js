import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import imgg from "../images/book1.jpg"
import '../index.css';

const ProductDetails = ({cartItems,setCartItems}) => {

    const [books,setBooks]=useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { id } = useParams();
    
    // Add to Cart Function
    const handleCartItems= (book) => { 
        const extractedFields = {
            id: book.id,
            bookname: book.bookname,
            author: book.author,
            price: book.price
          };

        // Set Shopping Cart Items or Books
        setCartItems(cartItems => [...cartItems, {...extractedFields, quantity:1}]);
        
        // Show success message "Item added to cart successfully!"
        setShowSuccessMessage(true);
        setTimeout(() => {
        setShowSuccessMessage(false);
        }, 2000);
        
    };

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
                            <button className="btn btn-primary me-2" onClick={() => handleCartItems(book)}>Add to Cart</button>
                            <Link to="/" class="btn btn-secondary">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default ProductDetails;