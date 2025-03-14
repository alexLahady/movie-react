import './App.scss';
import './index.scss';
import Banner from './components/banner';
import Picture from './components/picture';

import { useState, useEffect } from 'react';


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
    fetch('http://localhost:3001')
    .then(response => response.json())
    .then(movie =>{
      //console.log(movie); // Log pour vérifier les données reçues
      setData(movie);
      setIsLoading(false); 
    })
  },[]);
  
  return (
    <div>
      <header> 
        <Banner />
      </header>
      <picture>
        <Picture />
      </picture>
      
      <main className='main'>
        <h2>trend</h2>
        {data.map((element) =>
        <div className='main-affiche' key={element.id}>
          <h3 className='main-title'>{isLoading ? 'Loading...' : (element ? `ID: ${element.title}` : 'No title available')} </h3>
          <p className='main-date'> {isLoading ? 'Loading...' : (element ? `Date: ${element.release_date}` : 'No date available')}</p>
          <p className='main-overview'>{isLoading ? 'Loading...' : (element ? `Overview: ${element.overview}` : 'No overview available')}</p>
          <p className='main-vote'>{isLoading ? 'Loading...' : (element ? `Vote: ${element.vote_average}` : 'No vote available')}</p>
        </div>
      )}
      </main>
    </div>
  );
}

export default App;

