import { useEffect, useState } from "react";
import imgg from "../images/book1.jpg"
import "../index.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Catalogue = ({cartItems, setCartItems}) => {
    const [books,setBooks] = useState();
    const [sortSelected,setSortSelected] = useState('title');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [catalogueBooks,setCatalogueBooks] = useState();
    const [searchText,setSearchText] = useState('');

    const preventSearch = (e) => {
        e.preventDefault(); // Prevent form submission and page refresh
    };

    const handleSearchType    = (event) => {
        let sortType = event.target.value;
        setSortSelected(sortType);
        
        // if (sortValue === 'title'){
        //     const sortedData = [...books].sort((a, b) => {
        //         if (a.bookname < b.bookname) return -1;
        //         if (a.bookname > b.bookname) return 1;
        //         return 0;
        //       });
        //       setBooks(sortedData);
        // }
        // else{
        //     const sortedData = [...books].sort((a, b) => {
        //         if (a.author < b.author) return -1;
        //         if (a.author > b.author) return 1;
        //         return 0;
        //       });
        //       setBooks(sortedData);
        // }
    };

    // Search Bar Functionality
    const handleSearch = (searchTerm) => {
        if (searchTerm==""){
            setCatalogueBooks(books);
        }
        else{
            if (sortSelected==='title'){
                const filteredData = books.filter(item =>
                    item.bookname.toLowerCase().includes(searchTerm.toLowerCase()));
                setCatalogueBooks(filteredData); 
            }
            else{
                const filteredData = books.filter(item =>
                    item.author.toLowerCase().includes(searchTerm.toLowerCase()));
                setCatalogueBooks(filteredData);
            }
        }
    };

    useEffect(() => {  
            fetch('http://localhost:8080/books',{method:'GET',headers:{'content-type':'application/json'}})
                .then(res => {
                    if (!res.ok){
                        throw Error('Could not fetch data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setBooks(data?.data);
                    setCatalogueBooks(data?.data);
                })
                .catch(err => {
                    console.log(err);
                })
    }, []);
    

    // Add Items to Cart 
    const handleCartItems= (item) => {
        setCartItems(cartItems => [...cartItems, {...item, quantity:1}]); 
        setShowSuccessMessage(true);
        // Reset success message after a certain time
        setTimeout(() => {
        setShowSuccessMessage(false); //Display Message for 2 sec
        }, 2000);
        
    };

    return (  
        <div>
            <div className="search searchPadding"> 
                <div class="container">
                    <div class="row">
                    <div class="col-sm-6">
                        <form class="d-flex" role="search" onSubmit={preventSearch}>
                            <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" onChange={(e)=>{setSearchText(e.target.value)}}/>
                            <button class="btn btn-outline-success" type="button"  onClick={() => handleSearch(searchText)}>Search</button>
                        </form>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-check form-check-inline">
                            <label class="form-check-label" for="search_filter">Search By: </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="search_filter" id="title" value="title" checked={sortSelected === "title"} onChange={handleSearchType}/>
                            <label class="form-check-label" for="search_filter1">Title</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="search_filter" id="author" value="author" checked={sortSelected === "author"} onChange={handleSearchType}/>
                            <label class="form-check-label" for="search_filter2">Author</label>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Item added to cart successfully!
                </div>
            )}

            <div className="catalogues catalougePadding">
                
                {catalogueBooks?.map((book)=>(
                    <div key={book.id} className="col-md-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <img src={imgg} alt="Book"/>
                                <h5 className="card-title">{book.bookname}</h5>
                                <h6>-{book.author}</h6>
                                <p className="card-text">Price: ${book.price}</p>
                                <button className="btn btn-primary" onClick={() => handleCartItems(book)}>Add to Cart</button>{' '}
                                <Link to={'/productinfo/'+book.id}><button className="btn btn-primary">Product Details</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Catalogue;
