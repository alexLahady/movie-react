//Component
import Banner from './components/banner';
import Picture from './components/picture';
import RenderCards from './components/movies/MoviesCards';

//CSS
import './App.scss';
import './index.scss';

//utils
import { apiUrl } from './types';
import { ApiMovies } from './types/movies';

//Framework Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

//React
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  //100 datas de l'API de MovieDB
  const [data, setData] = useState<ApiMovies[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${apiUrl}/api`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((movie) => {
        setData(movie.slice(0, 20)); //besoin que des 20 premier
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Erreur fetch :', err);
      });
  }, []);

  return (
    <div>
      <header>
        <Banner />
      </header>
      <picture>
        <Picture />
      </picture>

      <main className="main">
        <h2>Trend</h2>
        <div className="app-box">
          {isLoading
            ? 'loading.....'
            : data.map((element, index) => (
                <RenderCards key={`${element.id}-${index}`} showClassic movie={element} />
              ))}
        </div>
        <Link to="/browser" className="main-redirection">
          <div className="redirection-content">
            <div>More movie go to Browser</div>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </Link>
      </main>
    </div>
  );
}

export default App;
