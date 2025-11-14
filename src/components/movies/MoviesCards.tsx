//utils
import { Movie, UserMovie } from '../../types/movies';
import { formatDate } from '../../utils/formatDate';

//Framework MUI
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

//React
import { Link } from 'react-router-dom';

//pas de boucle je fais juste le test sur le movie est dans le usermovie
//ensuite j'affiche le coeur vide ou plein en fonction de usermovie
//chaque clic sera local mais actualisation en fonction de la base de donnée

//faire en sorte que se soit de manière dynamique en front et mettre jsute une 1s d'attente ou pas

function RenderCards({
  showClassic,
  movie,
  //userMovie,
}: {
  showClassic: boolean;
  movie: Movie;
  userMovie?: UserMovie[];
}) {
  if (showClassic) {
    return (
      <Card
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
          title={movie.title}
          subheader={formatDate(movie.release_date)}
        />
        <CardActionArea
          component={Link}
          to={`/status?title=${movie.title}&poster_path=${movie.poster_path}&overview=${movie.overview}&release_date=${movie.release_date}&vote_average=${movie.vote_average}`}
        >
          <CardMedia component="img" height="500" image={movie.poster_path} alt={movie.title} />
        </CardActionArea>
        <CardContent>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            {movie.overview}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ mt: 'auto' }}>
          <Typography sx={{ color: 'white' }}>{movie.vote_average}/10</Typography>
        </CardActions>
      </Card>
    );
  } else {
    return (
      <Card
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
          title={movie.title}
          subheader={formatDate(movie.release_date)}
        />
        <CardMedia component="img" height="500" image={movie.poster_path} alt={movie.title} />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            {movie.overview}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ mt: 'auto' }}>
          <Typography sx={{ color: 'white' }}>{movie.vote_average}/10</Typography>
        </CardActions>
      </Card>
    );
  }
}

export default RenderCards;
