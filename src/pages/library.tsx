import Banner from "../components/banner";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookie from "../components/cookie";
import Box from "../components/box";

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
            Cookie(false,url,'GET',)
                .then(allMovie => {
                    setMovies(allMovie);
                    setIsLoading(false);
                });
        }
    }, [dataUser,sort,order]);

    // Afficher les films ou autres contenus ici
    console.log(isLoading);
    if (!isLoading && dataUser.length > 0) {

        const handleSort = (criteria: 'title' | 'release_date' | 'vote_average') => {
            setSort(criteria);
            criteria === 'title' ? setOrder('asc') : setOrder('desc');
          };

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
                <div className="movie">{Box(isLoading,movies)}</div>
            </div>
        );
    } else {
        return (
            <div>
                <Banner />
                <div>connection <Link to={'/user'}> login</Link></div>
            </div>
        );
    }
}

export default Library;


