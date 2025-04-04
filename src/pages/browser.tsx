import Banner from "../components/banner";
import { useState, useEffect } from "react";
import Cookie from "../components/cookie";
import Box from "../components/box";


interface Movie {
    id: number;
    title: string;
    userId: number;
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

function Browser() {
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


    //Affiche tout les films
    useEffect(() => {
        fetch('http://localhost:3001')
            .then(response => response.json())
            .then(movie => {
                //console.log(movie); // Log pour vérifier les données reçues
                setData(movie);
                setIsLoading(false);
            })
    }, []);

    //Donnée utilisateur 
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
            let url = `http://localhost:3001/me/movies/user/${dataUser[0]}?sort=${sort}&order=${order}`
            Cookie(false, url, 'GET',)
                .then(allMovie => {
                    setUserMovies(allMovie);
                });
        }
    }, [dataUser, sort, order]);


    if (!isLoading) {

        const handleSort = (criteria: 'title' | 'release_date' | 'vote_average') => {
            setSort(criteria);
            criteria === 'title' ? setOrder('asc') : setOrder('desc');
        };
        /*
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US');
        }

        const handleDelete = async (userId: number, element: Movie) => {
            let deleteElement = { userId: userId, title: element.title }
            let url = 'http://localhost:3001/delete/movie';
            await Cookie(false, url, 'DELETE', deleteElement);

            url = `http://localhost:3001/me/movies/user/${dataUser[0]}?sort=${sort}&order=${order}`
            await Cookie(false, url, 'GET',)
                .then(allMovie => {
                    setMovies(allMovie);
                });
        }

        const handlePush = async (userId: number, element: Movie) => {
            let newElement = { title: element.title, overview: element.overview, release_date: element.release_date, vote_average: element.vote_average };
            let url = `http://localhost:3001/me/movies/${userId}`;
            await Cookie(false, url, 'POST', newElement);

            url = `http://localhost:3001/me/movies/user/${dataUser[0]}?sort=${sort}&order=${order}`
            await Cookie(false, url, 'GET',)
                .then(allMovie => {
                    setMovies(allMovie);
                });
        }

        const pushOrDelete = (userId: number, userMovies: UserMovie[], element: Movie) => {
            let foundMovie = userMovies.some((user) => user.title === element.title);
            return foundMovie ? (<button onClick={() => handleDelete(userId, element)}>Delete</button>) : (<button onClick={() => handlePush(userId, element)}>Push</button>);

        }

        */
        let trueUserId = Number(dataUser[0]); //pour rouver à TS que c'est un number


        return (
            <div>
                <Banner />
                <h2>list movies</h2>
                <div className="library-sort">
                    <h3>sort</h3>
                    <button onClick={() => handleSort('title')}>title</button>
                    <button onClick={() => handleSort('release_date')}>Date</button>
                    <button onClick={() => handleSort('vote_average')}>Rating</button>
                </div>
                <div>
                    {Box(isLoading,data,userMovies,trueUserId)}
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