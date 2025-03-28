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

function Library() {
    const [dataUser, setDataUser] = useState<(number | string)[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
                setIsLoading(true);
            })
    }, []);


    useEffect(() => {
        // Vérifier si les données utilisateur sont prêtes (par exemple, en vérifiant si dataUser a bien deux éléments)
        if (dataUser.length === 2) {
            fetch(`http://localhost:3001/me/movies/user/${dataUser[0]}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(allMovie => {
                    setMovies(allMovie);
                });
        }
    }, [dataUser]);

    
    //let userMovies = isLoading ? <div>Loading...</div> : <div>{movies.title} </div>

    // Afficher les films ou autres contenus ici

    if(isLoading){
        return (
            <div>
                <Banner />
                <h2>list movies</h2>
                <div className="library-sort">sort</div>
                <div className="movie"></div>
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
    //let userMovies = isLoading ? <div>Loading...</div> : <div>{movies.} </div>



}

export default Library;

/*
return (
        <div>
            <Banner />
            <h2>list movies</h2>
            <div className="library-sort">sort</div>
            <div className="movie"></div>
        </div>
    )



    return (
            <div>
                <Banner />
                <div>connection <Link to={'/user'}> login</Link></div>
            </div>
        )
*/

