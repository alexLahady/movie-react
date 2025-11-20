import { useAuth } from './auth/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavBarUser() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <li style={{ color: 'white' }}>Loading...</li>;
  } else if (user?.id) {
    return (
      <li style={{ color: 'white' }}>
        {user.name}{' '}
        <span onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </span>
      </li>
    );
  } else {
    return (
      <li>
        <Link to="/user">Login/Signup</Link>
      </li>
    );
  }
}

export default NavBarUser;
