//Services
import { getCookie, logout } from '../services';

//type
import { CookieUser } from '../types/auth';

//CSS
import '../styles/banner.scss';

//Framework FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
//import { jwtDecode } from "jwt-decode";

//React
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState<CookieUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCookie().then((user) => {
      setDataUser(user);
      setIsLoading(false);
    });
  }, []);

  const bannerLogout = async () => {
    await logout();
    navigate('/user');
    //window.location.reload();
  };

  let navUser;
  const fontAwesome = <FontAwesomeIcon icon={faRightFromBracket} />;

  //console.log(dataUser?.id);

  if (dataUser?.id) {
    navUser = isLoading ? (
      <li style={{ color: 'white' }}>Loading...</li>
    ) : (
      <li style={{ color: 'white' }}>
        {dataUser?.name} <span onClick={bannerLogout}>{fontAwesome}</span>
      </li>
    );
  } else {
    navUser = (
      <li>
        <Link to="/user">Login/Signup</Link>
      </li>
    );
  }
  //console.log(dataUser.length <= 2);

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
