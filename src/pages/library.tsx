//Component
import Banner from "../components/banner";
import Cookie from "../components/cookie";
import RenderCards from "../components/renderCards";

//CSS
import '../styles/library.scss';

//Utils
import { Movie, apiUrl } from "../utils/type";

//Framework MUI
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//React
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Library() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //Date utilisateur id et nom
    const [dataUser, setDataUser] = useState<(number | string)[]>([]);

    //Data des films de l'utilisateur
    const [movies, setMovies] = useState<Movie[]>([]);

    //Parametre pour ranger les films
    const [sort, setSort] = useState<'title' | 'release_date' | 'vote_average'>('title');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        // Vérifier si les données utilisateur sont prêtes
        Cookie(true)
            .then(response => {
                setDataUser(response);
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        if (dataUser.length === 2) {
            let reqUrl = `${apiUrl}/me/movies/user/${dataUser[0]}?sort=${sort}&order=${order}`
            Cookie(false, reqUrl, 'GET',)
                .then(allMovie => {
                    setMovies(allMovie);
                    setIsLoading(false);
                });
        }
    }, [dataUser, sort, order]);

    // Afficher les films ou autres contenus ici
    //console.log(isLoading);
    //console.log('taille du tableau movie : ' + movies.length);
    if (dataUser.length > 0 && movies.length === 0) {
        return (
            <div className="library">
                <Banner />
                <div className="library-connect">You don't have a favorite movie go to<br></br><Link to={'/browser'}><Button variant="contained">browser</Button></Link></div>
            </div>
        );
    } else {
        if (!isLoading && dataUser.length > 0) {

            const handleSort = (criteria: 'title' | 'release_date' | 'vote_average') => {
                setSort(criteria);
                criteria === 'title' ? setOrder('asc') : setOrder('desc');
            };

            return (
                <div className="library">
                    <Banner />
                    <h2>Movies list of {dataUser[1]}</h2>
                    <div className="library-grid">
                        <div className="library-sort">
                            <FormControl>
                                <FormLabel id="radio-buttons-sort">Sort</FormLabel>
                                <RadioGroup
                                    aria-labelledby="radio-buttons-sort-group-label"
                                    defaultValue="title"
                                    name="radio-caca-group"
                                >
                                    <FormControlLabel onClick={() => handleSort('title')} value="title" control={<Radio />} label="Title" />
                                    <FormControlLabel onClick={() => handleSort('release_date')} value="release_date" control={<Radio />} label="Date" />
                                    <FormControlLabel onClick={() => handleSort('vote_average')} value="vote_average" control={<Radio />} label="Rating" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="library-movie">
                            {isLoading ? 'Loading....' :
                                movies.map((element) => (
                                    <RenderCards
                                        showClassic
                                        movie={element}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Banner />
                    <div className="library-connect">You are not connection got to<br></br><Link to={'/user'}><Button variant="contained">login</Button></Link></div>
                </div>
            );
        }
    }
}

export default Library;