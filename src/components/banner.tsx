//Component 
import NavBarUser from './navBarUser';

//CSS
import '../styles/banner.scss';

//React
import { Link } from 'react-router';

function Banner() {
  return (
    <nav className="nav-banner">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/me/movies">Library</Link>
        </li>
        <li>
          <Link to="/browser">Browser</Link>
        </li>
        <NavBarUser />
      </ul>
    </nav>
  );
}

export default Banner;
