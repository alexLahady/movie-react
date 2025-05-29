import { Link } from "react-router";
import "../styles/banner.scss";
import Cookie from "./cookie";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
//import { jwtDecode } from "jwt-decode";


function Banner() {
  const [dataUser, setDataUser] = useState<(number | string)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //trouver une solution pour deco auto pour ressoudre le problème du serveur qui crash si pas auto deco
  //console.log(document.cookie);
  /*
  const token = document.cookie
  .split('; ')
  .find(row => row.startsWith('authtoken='))
  ?.split('=')[1];


   const decoded = jwtDecode(String(token));
  console.log('toekn 2 = '+decoded);
  console.log('le token decoder est ='+token);
  */

  useEffect(() => {
    Cookie(true)
      .then(response => {
        setDataUser(response);
        setIsLoading(false);
      })
  }, []);

  const logout = async () => {
    let url = 'http://localhost:3001/delete/logout';
    await Cookie(false, url, 'POST')
    window.location.reload();
  }

  let navUser;
  let fontAwesome = <FontAwesomeIcon icon={faRightFromBracket} />

  if (dataUser.length <= 2) {
    navUser = isLoading ? (<li style={{ color: "white" }}>Loading...</li>) : (<li style={{ color: "white" }}>{dataUser[1]} <span onClick={logout}>{fontAwesome}</span></li>)
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
