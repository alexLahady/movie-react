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
      .then(movie => {
        console.log(movie); // Log pour vérifier les données reçues
        setData(movie);
        setIsLoading(false);
      })
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
          {isLoading ? 'loading.....' : data.slice(0,20).map((element) => (
            <Card key={element.id} sx={{ maxWidth: 345, mt: '20px', bgcolor: '#212E53' }}>
              <CardHeader sx={{ color: 'white' }}
                title={element.title}
                subheader={formatDate(element.release_date)}
              />
              <CardMedia
                component="img"
                height="194"
                image='https://quai10-website.s3.eu-west-3.amazonaws.com/backgrounds/sonic-3-le-film-0-fe033741ae88fb6d9e5296f7efd19e5c-0_2024-12-23-152750_vtuh.jpg'
                alt={element.title}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  {element.overview}
                </Typography>
              </CardContent>
              <CardActions disableSpacing >
                <Typography sx={{ color: 'white' }}>
                  {element.vote_average}/10
                </Typography>
              </CardActions>
            </Card>))}
        </div>
      </main>
    </div>
  );
}

export default App;

//plus tart quand l'utilisateur est co

/*
<IconButton onClick={() => handlefavorites(element)}aria-label="add to favorites" >
                                    {favorite(element) ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
                                </IconButton>
*/





/*

 {data.map((element) =>
        <div className='main-affiche' key={element.id}>
          <h3 className='main-title'>{isLoading ? 'Loading...' : (element ? `ID: ${element.title}` : 'No title available')} </h3>
          <p className='main-date'> {isLoading ? 'Loading...' : (element ? `Date: ${element.release_date}` : 'No date available')}</p>
          <p className='main-overview'>{isLoading ? 'Loading...' : (element ? `Overview: ${element.overview}` : 'No overview available')}</p>
          <p className='main-vote'>{isLoading ? 'Loading...' : (element ? `Vote: ${element.vote_average}` : 'No vote available')}</p>
        </div>
      )}

*/





/*
{data.map((element) => (
                        <Card sx={{ maxWidth: 345, mt: '20px',bgcolor: '#212E53' }}>
                            <CardHeader sx={{ color: 'white' }}
                                title={element.title}
                                subheader={formatDate(element.release_date)}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image='https://quai10-website.s3.eu-west-3.amazonaws.com/backgrounds/sonic-3-le-film-0-fe033741ae88fb6d9e5296f7efd19e5c-0_2024-12-23-152750_vtuh.jpg'
                                alt={element.title}
                            />
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'gray' }}>
                                    {element.overview}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing >
                                <IconButton onClick={() => handlefavorites(element)}aria-label="add to favorites" >
                                    {favorite(element) ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
                                </IconButton>
                                <Typography sx={{ color: 'gray' }}>
                                    {element.vote_average}
                                </Typography>
                            </CardActions>
                        </Card>
                    ))}
                      */