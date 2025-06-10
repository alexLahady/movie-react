import { useEffect, useState } from 'react';
import './App.scss';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}


function App() {
  const [data, setData] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
  fetch('https://movie-test-vercel-delta.vercel.app/')
    .then(response => response.json())
    .then(movie => {
      setData(movie);
      console.log(movie);
      setIsLoading(false);
    })
    .catch(err => console.error(err));
}, []);




  return (
    <div className="App">
      <header className="App-header">

        bienvenue dans le projet Movie. JE SUIS LA 
        {isLoading ? <div>Looading ....</div> : 
        <div>
          <h2>{data[0].title}</h2>
          <p>{data[0].overview}</p>
          <p>{data[0].vote_average}</p>
        </div>
        
        }

      </header>
    </div>
  );
}

export default App;
