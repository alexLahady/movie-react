import Banner from "../components/banner";
import { useState, useEffect } from "react";
import Cookie from "../components/cookie";
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import '../styles/brower.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { Movie, UserMovie } from "../utils/type";

function Browser() {
    //refresh 
    const [refreshKey, setRefreshKey] = useState(0);

    //Liste de l'api
    const [data, setData] = useState<Movie[]>([]);

    //User avev  Id et Nom
    const [dataUser, setDataUser] = useState<(number | string)[]>([]);

    //Liste de film de l'utilisateur 
    const [userMovies, setUserMovies] = useState<UserMovie[]>([]);

    //Un chargement
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //Variable pour ranger
    const [sort, setSort] = useState<'title' | 'release_date' | 'vote_average'>('title');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    //valeur de la page
    const [page, setPage] = useState<number>(1);

    //valeur du tableau en fonction de la page(pour changer de page)
    const [indexPage, setIndexPage] = useState<number>(0);


    //Affiche tout les films
    useEffect(() => {
        fetch('https://movie-test-vercel-delta.vercel.app/')
            .then(response => response.json())
            .then(movie => {
                //console.log(movie); // Log pour vérifier les données reçues
                setData(movie);
                setIsLoading(false);
            })
    }, []);

    //Donnée utilisateur sécurisé
    useEffect(() => {
        Cookie(true)
            .then(response => {
                setDataUser(response);
            })
    }, []);

    //Donnée utilisateur de ses films dans l'ordre alphabétique
    useEffect(() => {
        // Vérifier si les données utilisateur sont prêtes
        if (dataUser.length === 2) {
            let url = `https://movie-test-vercel-delta.vercel.app/me/movies/user/${dataUser[0]}?sort=${sort}&order=${order}`
            Cookie(false, url, 'GET',)
                .then(allMovie => {
                    setUserMovies(allMovie);
                });
        }
        //console.log(userMovies);
    }, [dataUser, sort, order,refreshKey]);



    //pour avoir la valeur de la page
    useEffect(() => {
        console.log(page)
        let truePage = page - 1;
        setIndexPage(truePage * 8)

        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    }, [page, indexPage]);


    if (!isLoading) {

        const favorite = (element: Movie) => {
            let foundMovie = userMovies.some((user) => user.title === element.title);
            if (foundMovie) {
                return true
            }
            return false
        }

        const handleSort = (criteria: 'title' | 'release_date' | 'vote_average') => {
            setSort(criteria);
            criteria === 'title' ? setOrder('asc') : setOrder('desc');
        };

        let trueUserId = Number(dataUser[0]); //pour prouver à TS que c'est un number

        const handlefavorites = async (element: Movie) => {
            let foundMovie = userMovies.some((user) => user.title === element.title);
            if (!foundMovie) {
                let newElement = {
                    title: element.title,
                    poster_path: element.poster_path,
                    overview: element.overview,
                    release_date: element.release_date,
                    vote_average: element.vote_average
                };
                let url = `https://movie-test-vercel-delta.vercel.app/me/movies/${dataUser[0]}`;
                await Cookie(false, url, 'POST', newElement);

                //window.location.reload();
                setRefreshKey(prev => prev + 1);

            } else {
                let deleteElement = { userId: trueUserId, title: element.title }
                let url = 'https://movie-test-vercel-delta.vercel.app/delete/movie';
                await Cookie(false, url, 'DELETE', deleteElement);

                //window.location.reload();
                setRefreshKey(prev => prev + 1);
            }
        }

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US');
        }

        //Pour savoir si l'utilisateur est pas connecté 
        //Test pour savoir si sa renvoit une erreur et revoyer vrai si c'est le cas
        const isNotConnected = !dataUser || (Array.isArray(dataUser) && dataUser.length === 0) || (typeof dataUser === 'object' && 'error' in dataUser);

        //console.log('datauser valeur est de ' + isNotConnected);

        return (
            <div className="broswer">
                <Banner />
                <h2>list movies</h2>
                <div className="browser-sort">
                    <h3>sort</h3>
                    <button onClick={() => handleSort('title')}>title</button>
                    <button onClick={() => handleSort('release_date')}>Date</button>
                    <button onClick={() => handleSort('vote_average')}>Rating</button>
                </div>
                <div className="browser-movie">
                    {data.slice(indexPage, indexPage + 8).map((element) => (
                        <Card sx={{ maxWidth: 345, mt: '20px', bgcolor: '#212E53', display: 'flex', flexDirection: 'column', }}>
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
                            <CardActions disableSpacing sx={{ mt: 'auto' }}>
                                {isNotConnected ? <div></div> :
                                    <IconButton onClick={() => handlefavorites(element)} aria-label="add to favorites" >
                                        {favorite(element) ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
                                    </IconButton>}
                                <Typography sx={{ color: 'white' }}>
                                    {element.vote_average}/10
                                </Typography>
                            </CardActions>
                        </Card>
                    ))}
                </div>
                <div className="browser-pagination">
                    <Stack direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: '100%', mt: 4, mb: 4 }} spacing={2}>
                        <Pagination sx={{
                            '& .MuiPaginationItem-root': {
                                fontSize: '1.2rem',
                            }
                        }}
                            page={page}
                            onChange={(e, value) =>
                                setPage(value)
                            }
                            //onClick={() => handlePage(page)}
                            count={13} size="large" />
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

// {Box(isLoading,data,userMovies,trueUserId)}