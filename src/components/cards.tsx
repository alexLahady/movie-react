import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Cookie from './cookie';


interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;

}

interface UserMovie {
  id: number;
  title: string;
  userId: number;
  overview: string;
  release_date: string;
  vote_average: number;

}

//pas de boucle je fais juste le test sur le movie est dans le usermovie
//ensuite j'affiche le coeur vide ou plein en fonction de usermovie
//chaque clic sera local mais actualisation en fonction de la base de donnée

function Cards(movie: Movie, userMovie: UserMovie[]) {
  let fullHeart = true;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  }

  const favorites = async () => {
    let foundMovie = userMovie.some((user) => user.title === movie.title);
    if (foundMovie) {
      let newElement = { title: movie.title, overview: movie.overview, release_date: movie.release_date, vote_average: movie.vote_average };
      let url = `http://localhost:3001/me/movies/${userMovie[0].userId}`;
      await Cookie(false, url, 'POST', newElement);
      fullHeart = true;
    } else {
      let deleteElement = { userId: userMovie[0].userId, title: movie.title }
      let url = 'http://localhost:3001/delete/movie';
      await Cookie(false, url, 'DELETE', deleteElement);
      fullHeart = false;
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={movie.title}
        subheader={formatDate(movie.release_date)}
      />
      <CardMedia
        component="img"
        height="194"
        image='https://quai10-website.s3.eu-west-3.amazonaws.com/backgrounds/sonic-3-le-film-0-fe033741ae88fb6d9e5296f7efd19e5c-0_2024-12-23-152750_vtuh.jpg'
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={favorites} aria-label="add to favorites">
          {fullHeart ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
        </IconButton>
      </CardActions>
    </Card>
  );
}


export default Cards;
