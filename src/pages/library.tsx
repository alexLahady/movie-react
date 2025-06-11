import Banner from "../components/banner";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookie from "../components/cookie";
//import Box from "../components/box";
import '../styles/library.scss';

import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
//import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

function Library() {
    const [dataUser, setDataUser] = useState<(number | string)[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sort, setSort] = useState<'title' | 'release_date' | 'vote_average'>('title');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');


    useEffect(() => {
        Cookie(true)
            .then(response => {
                setDataUser(response);
                setIsLoading(false);
            })
    }, []);


    useEffect(() => {
        // Vérifier si les données utilisateur sont prêtes
        if (dataUser.length === 2) {
            let url = `http://localhost:3001/me/movies/user/${dataUser[0]}?sort=${sort}&order=${order}`
            Cookie(false, url, 'GET',)
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

            const formatDate = (dateString: string) => {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US');
            }

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
                                    <Card sx={{ maxWidth: 300, mt: '20px', bgcolor: '#212E53' }}>
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
                                    </Card>
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