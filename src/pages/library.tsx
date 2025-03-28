import Banner from "../components/banner";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); 
}


function Library() {
    const [dataUser, setDataUser] = useState<(number | string)[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sort, setSort] = useState<'title' | 'release_date' | 'vote_average'>('title');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');


    useEffect(() => {
        fetch('http://localhost:3001/pro/pro', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(arrayUser => {
                setDataUser(arrayUser);
            })
    }, []);


    useEffect(() => {
        // Vérifier si les données utilisateur sont prêtes
        if (dataUser.length === 2) {
            fetch(`http://localhost:3001/me/movies/user/${dataUser[0]}?sort=${sort}&order=${order}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(allMovie => {
                    setMovies(allMovie);
                    setIsLoading(false);
                });
        }
    }, [dataUser,sort,order]);

    // Afficher les films ou autres contenus ici

    if (!isLoading) {

        const handleSort = (criteria: 'title' | 'release_date' | 'vote_average') => {
            setSort(criteria);
            criteria === 'title' ? setOrder('asc') : setOrder('desc');
          };


        let userMovies = movies.map((element) =>
            <div className='library-affiche' key={element.id}>
                <h3 className='library-title'>{isLoading ? 'Loading...' : (element ? `Title: ${element.title}` : 'No title available')} </h3>
                <p className='library-date'> {isLoading ? 'Loading...' : (element ? `Date: ${formatDate(element.release_date)}` : 'No date available')}</p>
                <p className='library-overview'>{isLoading ? 'Loading...' : (element ? `Overview: ${element.overview}` : 'No overview available')}</p>
                <p className='library-vote'>{isLoading ? 'Loading...' : (element ? `Vote: ${element.vote_average}` : 'No vote available')}</p>
            </div>
        )

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
                <div className="movie">{userMovies}</div>
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


