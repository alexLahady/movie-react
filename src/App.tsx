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
        console.log(movie); // Log pour vérifier les données reçues
        setData(movie);
        setIsLoading(false);
      })
  }, []);




  return (
    <div className="App">
      <header className="App-header">

        bienvenue dans le projet Movie. JE SUIS LA 

      </header>
    </div>
  );
}

export default App;
