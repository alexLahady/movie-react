import './App.scss';
import './index.scss';
import Banner from './components/banner';
import Picture from './components/picture';

import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';



interface Movie {
  id: number;
  title: string;
  poster_path : string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface userMovie {
  id: number;
  title: string;
  poster_path : string;
  overview: string;
  release_date: string;
  vote_average: number;
  userId : number;
}


function App() {
  const [data, setData] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

 useEffect(() => {
  fetch('https://movie-test-vercel-delta.vercel.app/', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(movie => {
      console.log(movie); // Log pour vérifier les données reçues
      setData(movie);
      setIsLoading(false);
    })
    .catch(err => {
      console.error("Erreur fetch :", err);
    });
}, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  }

  return (
    <div>
      <header>
        <Banner />
      </header>
      <picture>
        <Picture />
      </picture>

      <main className='main'>
        <h2>Trend</h2>
        <div className='app-box'>
          {isLoading ? 'loading.....' : data.slice(0, 20).map((element) => (
            <Card key={element.id} sx={{ maxWidth: 345, mt: '20px', bgcolor: '#212E53', display: 'flex', flexDirection: 'column',  }}>
              <CardHeader sx={{ color: 'white' }}
                title={element.title}
                subheader={formatDate(element.release_date)}
              />
              <CardMedia
                component="img"
                height="500"
                image={element.poster_path}
                alt={element.title}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  {element.overview}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ mt: 'auto' }} >
                <Typography sx={{ color: 'white' }}>
                  {element.vote_average}/10
                </Typography>
              </CardActions>
            </Card>))}
        </div>
        <Link to='/browser' className='main-redirection'>
          <div className='redirection-content'>
            <div>More movie go to Browser</div>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </Link>

      </main>
    </div>
  );
}

export default App;

//plus tart quand l'utilisateur est co mettre les favori