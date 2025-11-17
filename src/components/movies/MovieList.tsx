//Component
import Banner from '../banner';

//Services
import { indexService } from '../../services';

//CSS
import '../../styles/brower.scss';

//type
import { PageData } from '../../types';

//utils
import { formatDate } from '../../utils/formatters';

/***Framework***/
//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
//MUI
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//import CircularProgress from '@mui/material/CircularProgress';

//React
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

function Browser() {
  //valeur de la page
  const [page, setPage] = useState<number>(1);

  //useSWR qui gère la récuparation de tout les film, la connection et si connecté les favoris de l'utilisateur
  const { data, isLoading } = useSWR<PageData>('pageData', async () => {
    //PageData regroupe 3 type l'ApiMovies, CookiesUser et Usermovie
    const movies = await indexService.allMovies(); // tous les films
    const user = await indexService.getCookie(); //connecté ou pas

    let userMovies = [];
    if (user?.id) {
      // si connecté
      userMovies = await indexService.moviesUser(user.id); //liste des favoris de l'utilisateur
    }

    return {
      //data 3 valeurs userMovies peut-être vide
      movies,
      user,
      userMovies,
    };
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Error</p>;

  const movies = data.movies;
  const user = data.user;
  const userMovies = data.userMovies;

  //Pagination
  const indexPage = (page - 1) * 8;

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); //une petite attente après l'ajout d'un favori ou supprimer un favori

  if (!isLoading) {
    const favorite = (element: PageData['movies'][0]) => {
      const foundMovie = userMovies.some((user) => user.title === element.title);
      if (foundMovie) {
        return true;
      }
      return false;
    };

    const handlefavorites = async (element: PageData['movies'][0]) => {
      console.log('je suis dedans');
      const foundMovie = userMovies.some((user) => user.title === element.title);
      if (!foundMovie) {
        const newElement = {
          title: element.title,
          poster_path: element.poster_path,
          overview: element.overview,
          release_date: element.release_date,
          vote_average: element.vote_average,
        };

        await indexService.addingMovie(user.id, newElement);

        await wait(200);
        //window.location.reload();
        mutate('pageData'); //refetch le fetcher et met à jour `pageData` qui est en cache après modification
      } else {
        const deleteElement = { userId: user.id, title: element.title };
        //console.log(deleteElement);
        await indexService.deleteMovieUser(deleteElement);

        await wait(200);
        //window.location.reload();
        mutate('pageData'); //refetch le fetcher et met à jour `pageData` qui est en cache après modification
      }
    };

    //Pour savoir si l'utilisateur est pas connecté
    //Test pour savoir si sa renvoit une erreur et revoyer vrai si c'est le cas
    const isNotConnected =
      !user ||
      (Array.isArray(user) && user.length === 0) ||
      (typeof user === 'object' && 'error' in user);

    //console.log('datauser valeur est de ' + isNotConnected);

    return (
      <div className="broswer">
        <Banner />
        <h2>List movies</h2>
        <div className="browser-movie">
          {movies.slice(indexPage, indexPage + 8).map((element, index) => (
            <Card
              key={`${element.id}-${index}`}
              sx={{
                maxWidth: 345,
                mt: '20px',
                bgcolor: '#212E53',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardHeader
                sx={{ color: 'white' }}
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
              <CardActions disableSpacing sx={{ mt: 'auto' }}>
                {isNotConnected ? (
                  <div></div>
                ) : (
                  <IconButton
                    onClick={() => handlefavorites(element)}
                    aria-label="add to favorites"
                  >
                    {favorite(element) ? (
                      <FontAwesomeIcon icon={faHeartSolid} />
                    ) : (
                      <FontAwesomeIcon icon={faHeartRegular} />
                    )}
                  </IconButton>
                )}
                <Typography sx={{ color: 'white' }}>{element.vote_average}/10</Typography>
              </CardActions>
            </Card>
          ))}
        </div>
        <div className="browser-pagination">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%', mt: 4, mb: 4 }}
            spacing={2}
          >
            <Pagination
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '1.2rem',
                },
              }}
              page={page}
              onChange={(e, value) => setPage(value)}
              //onClick={() => handlePage(page)}
              count={13}
              size="large"
            />
          </Stack>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Banner />
        <div>Loading....</div>
      </div>
    );
  }
}

export default Browser;
