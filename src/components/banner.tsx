//Component
import Cookie from "./cookie";

//utils
import { apiUrl } from "../utils/type";
import { CookieUser } from "../utils/type";

//CSS
import "../styles/banner.scss";

//Framework FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
//import { jwtDecode } from "jwt-decode";

//React
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from 'react-router-dom';


function Banner() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState<CookieUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    Cookie(true)
      .then(response => {
        setDataUser(response);
        setIsLoading(false);
      })
  }, []);

  const logout = async () => {
    let url = `${apiUrl}/auth/logout`;
    await Cookie(false, url, 'POST');
    navigate('/user');
    //window.location.reload();
  }

  let navUser;
  let fontAwesome = <FontAwesomeIcon icon={faRightFromBracket} />

  //console.log(dataUser?.id);

  if (dataUser?.id) {
    navUser = isLoading ? (<li style={{ color: "white" }}>Loading...</li>) : (<li style={{ color: "white" }}>{dataUser?.name} <span onClick={logout}>{fontAwesome}</span></li>)
  } else {
    navUser = <li><Link to="/user">Login/Signup</Link></li>
  }
  //console.log(dataUser.length <= 2);


  return (
    <nav className="nav-banner">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/me/movies">Library</Link></li>
        <li><Link to="/browser">Browser</Link></li>
        {navUser}
      </ul>
    </nav>
  )
}

export default Banner;
