//Component
import Banner from './components/banner';
import Picture from './components/picture';
import RenderCards from './components/movies/MoviesCards';

//Services
import { indexService } from './services';

//CSS
import './App.scss';
import './index.scss';

//utils
import { ApiMovies } from './types/movies';

//Framework Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

//React
import { Link } from 'react-router-dom';
//import { useState, useEffect } from 'react';
import useSWR from 'swr'

const fetcher = () => indexService.allMovies();

function App() {
  //100 datas de l'API de MovieDB
  const { data, error, isLoading } = useSWR<ApiMovies[]>('allMovies', fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error Data</p>;

  const movies = data?.slice(0, 20);

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
            : movies?.map((element, index) => (
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

/*
const [data, setData] = useState<ApiMovies[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    indexService
      .allMovies()
      .then((allMovies: ApiMovies[]) => {
        setData(allMovies.slice(0, 20));//besoin que des 20 premier
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Erreur fetch :', err);
      });
  }, []);

*/
