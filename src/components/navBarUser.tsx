import { useAuth } from './auth/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavBarUser() {
  let navUser;
  const fontAwesome = <FontAwesomeIcon icon={faRightFromBracket} />;
  const { user, loading, logout } = useAuth();

  if (loading) {
    navUser = <li style={{ color: 'white' }}>Loading...</li>;
  } else if (user?.id) {
     navUser = (
      <li style={{ color: 'white' }}>
        {user.name} <span onClick={logout}>{fontAwesome}</span>
      </li>
    );
  } else {
     navUser = (
      <li>
        <Link to="/user">Login/Signup</Link>
      </li>
    );
  }
 return navUser;
}

export default NavBarUser;