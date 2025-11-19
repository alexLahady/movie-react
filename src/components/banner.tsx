//auth
import { useAuth } from './auth/authContext';

//Services
import { logout } from '../services';

//CSS
import '../styles/banner.scss';

//Framework FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
//import { jwtDecode } from "jwt-decode";

//React
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();

  const bannerLogout = async () => {
    await logout();
    setUser(null);
    navigate('/user');
    //window.location.reload();
  };

  let navUser;
  const fontAwesome = <FontAwesomeIcon icon={faRightFromBracket} />;

  if (loading) {
    navUser = <li style={{ color: 'white' }}>Loading...</li>;
  } else if (user?.id) {
    navUser = (
      <li style={{ color: 'white' }}>
        {user.name} <span onClick={bannerLogout}>{fontAwesome}</span>
      </li>
    );
  } else {
    navUser = (
      <li>
        <Link to="/user">Login/Signup</Link>
      </li>
    );
  }

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
        {navUser}
      </ul>
    </nav>
  );
}

export default Banner;
