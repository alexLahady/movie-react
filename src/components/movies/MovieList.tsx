//Component
import Banner from '../banner';
import Cookie from '../cookie';

//CSS
import '../styles/brower.scss';

//utils
import { apiUrl } from '../../types/index';
import { ApiMovies, UserMovie } from '../../types/movies';
import { CookieUser } from '../../types/auth';

//Framework
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
import { useState, useEffect, useMemo } from 'react';

function Browser() {
  //refresh
  const [refreshKey, setRefreshKey] = useState(0);

  //Liste de l'api
  const [data, setData] = useState<ApiMovies[]>([]);

  //User avev  Id et Nom
  const [dataUser, setDataUser] = useState<CookieUser>();

  //Liste de film de l'utilisateur
  const [userMovies, setUserMovies] = useState<UserMovie[]>([]);

  //Un chargement
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //valeur de la page
  const [page, setPage] = useState<number>(1);

  //valeur du tableau en fonction de la page(pour changer de page)
  //const [indexPage, setIndexPage] = useState<number>(0);

  //Affiche tout les films
  useEffect(() => {
    fetch(`${apiUrl}/api`)
      .then((response) => response.json())
      .then((movie) => {
        //console.log(movie); // Log pour vérifier les données reçues
        setData(movie);
        setIsLoading(false);
      });
  }, []);

  //Donnée utilisateur sécurisé
  useEffect(() => {
    Cookie(true).then((response) => {
      setDataUser(response);
    });
  }, []);

  //Donnée utilisateur de ses films dans l'ordre alphabétique
  useEffect(() => {
    // Vérifier si les données utilisateur sont prêtes
    if (dataUser?.id) {
      const url = `${apiUrl}/movies/user/${dataUser?.id}?sort=title&order=asc`;
      Cookie(false, url, 'GET').then((allMovie) => {
        setUserMovies(allMovie);
      });
    }
    //console.log(userMovies);
  }, [dataUser, refreshKey]);

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  //pour avoir la valeur de la page
  /*
  useEffect(() => {
    console.log(page);
    const truePage = page - 1;
    setIndexPage(truePage * 8);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page, indexPage]);
*/

  const indexPage = useMemo(() => {
    return (page - 1) * 8;
  }, [page]);

  if (!isLoading) {
    const favorite = (element: ApiMovies) => {
      const foundMovie = userMovies.some((user) => user.title === element.title);
      if (foundMovie) {
        return true;
      }
      return false;
    };

    const trueUserId = Number(dataUser?.id); //pour prouver à TS que c'est un number

    const handlefavorites = async (element: ApiMovies) => {
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
        const url = `${apiUrl}/movies/${trueUserId}`;
        await Cookie(false, url, 'POST', newElement);

        await wait(200);
        //window.location.reload();
        setRefreshKey((prev) => prev + 1);
      } else {
        const deleteElement = { userId: trueUserId, title: element.title };
        console.log(deleteElement);
        const url = `${apiUrl}/movies/delete`;
        await Cookie(false, url, 'DELETE', deleteElement);

        await wait(200);
        //window.location.reload();
        setRefreshKey((prev) => prev + 1);
      }
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US');
    };

    //Pour savoir si l'utilisateur est pas connecté
    //Test pour savoir si sa renvoit une erreur et revoyer vrai si c'est le cas
    const isNotConnected =
      !dataUser ||
      (Array.isArray(dataUser) && dataUser.length === 0) ||
      (typeof dataUser === 'object' && 'error' in dataUser);

    //console.log('datauser valeur est de ' + isNotConnected);

    return (
      <div className="broswer">
        <Banner />
        <h2>List movies</h2>
        <div className="browser-movie">
          {data.slice(indexPage, indexPage + 8).map((element, index) => (
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
