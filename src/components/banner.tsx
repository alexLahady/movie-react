import { Link } from "react-router";
import "../styles/banner.scss";



function Banner() {
    return (
        <nav className="nav-banner">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/me/movies">Library</Link></li>
                <li><Link to="/browser">Browser</Link></li>
                <li><Link to="/user">Login/Signup</Link></li>
            </ul>
        </nav>
    )
}

export default Banner;