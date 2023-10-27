import './../styles/main.scss';
import './../styles/header.scss';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <h1>Rockar</h1>
      <nav>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Product</Link>
          <Link to="/customers">Customers</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;