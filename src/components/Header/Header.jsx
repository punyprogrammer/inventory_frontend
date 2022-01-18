import "./header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="headerContainer">
      <div className="headerLogo">
        <h1>Guitar Store.com</h1>
      </div>
      <div className="headerLinks">
        <Link  style={{textDecoration:'none'}}to="/">
          <span className="headerLink">Products</span>
        </Link>
        <Link style={{textDecoration:'none'}} to="/addproduct">
          <span className="headerLink">Add a Product</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
