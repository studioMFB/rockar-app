import './../styles/main.scss';
import './../styles/header.scss';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <h1>Rockar</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Product</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;