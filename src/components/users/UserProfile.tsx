import { useAuth } from '../auth/authContext';

//Component
import Banner from '../banner';
import RenderCards from '../movies/MoviesCards';

//CSS
import '../../styles/library.scss';

//services
import { moviesUser } from '../../services';

//type
import { PageDataUsers } from '../../types/index';

//Framework MUI
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//React
import { useState } from 'react';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

function Library() {
  //Parametre pour ranger les films
  const [sort, setSort] = useState<'title' | 'release_date' | 'vote_average'>('title');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const { user } = useAuth();

  const { data, isLoading } = useSWR<PageDataUsers>(
    user ? ['movieListUser', user.id, sort, order] : null, //pour avoir la valeur de sort et order au moment du refresh
    async () => {
      let userMovies = [];
      if (user?.id) {
        userMovies = await moviesUser(user.id, sort, order);
      }

      return {
        userMovies,
      };
    },
    {
      keepPreviousData: true, //garde l'ancienne liste visible
      revalidateOnFocus: false, // pas de refetch inutile
    },
  );

  if (isLoading) return <p>Loading...</p>;
  if (!data) {
    return (
      <div>
        <Banner />
        <div className="library-connect">
          You are not connection got to<br></br>
          <Link to={'/user'}>
            <Button variant="contained">login</Button>
          </Link>
        </div>
      </div>
    );
  }

  const userMovies = data.userMovies;

  // Afficher les films ou autres contenus ici
  if (userMovies.length === 0) {
    return (
      <div className="library">
        <Banner />
        <div className="library-connect">
          You don&apos;t have a favorite movie go to<br></br>
          <Link to={'/browser'}>
            <Button variant="contained">browser</Button>
          </Link>
        </div>
      </div>
    );
  } else {
      const handleSort = (criteria: 'title' | 'release_date' | 'vote_average') => {
        setSort(criteria);
        const orderValue = criteria === 'title' ? 'asc' : 'desc';
        setOrder(orderValue);
      };

      return (
        <div className="library">
          <Banner />
          <h2>Movies list of {user?.name}</h2>
          <div className="library-grid">
            <div className="library-sort">
              <FormControl>
                <FormLabel id="radio-buttons-sort">Sort</FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-sort-group-label"
                  defaultValue="title"
                  name="radio-caca-group"
                >
                  <FormControlLabel
                    onClick={() => handleSort('title')}
                    value="title"
                    control={<Radio />}
                    label="Title"
                  />
                  <FormControlLabel
                    onClick={() => handleSort('release_date')}
                    value="release_date"
                    control={<Radio />}
                    label="Date"
                  />
                  <FormControlLabel
                    onClick={() => handleSort('vote_average')}
                    value="vote_average"
                    control={<Radio />}
                    label="Rating"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="library-movie">
              {isLoading
                ? 'Loading....'
                : userMovies.map((element, index) => (
                    <RenderCards key={index} showClassic movie={element} />
                  ))}
            </div>
          </div>
        </div>
      );
  }
}

export default Library;
