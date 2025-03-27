import { Link } from "react-router";
import "../styles/banner.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


function Banner() {
    const [dataUser, setDataUser] = useState<(number | string)[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 
  
  useEffect(() => {
    fetch('http://localhost:3001/pro/pro', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(arrayUser =>{
      setDataUser(arrayUser);
      setIsLoading(false);
    })
  },[]);

  let navUser;
  let fontAwesome = <FontAwesomeIcon icon={faRightFromBracket} />
  
  if(dataUser.length <= 2){
    navUser = isLoading ? (<li style={{color : "white"}}>Loading...</li> ) : (<li style={{color : "white"}}>{dataUser[1]} <span>{fontAwesome }</span></li>)
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
