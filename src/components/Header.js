import { Link } from "react-router-dom";
import "../index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    
    return (  
        <div className="header">
            <nav class="navbar navbar-dark bg-dark">
                <div class="container d-flex justify-content-between">
                    <a class="navbar-brand" ><p className="title_name">BookStore</p></a>
                    
                    <ul class="navbar-nav flex-row">
                        <li class="nav-item active">
                            <a class="nav-link" ><Link to="/" class="nav-link">Home</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" ><Link to="/cart" class="nav-link">Shopping Cart</Link></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;