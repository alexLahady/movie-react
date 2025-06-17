import { useEffect, useState } from 'react';
import '../styles/picture.scss';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
}


function Picture() {
    const [data, setData] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('https://movie-test-vercel-delta.vercel.app/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(movie => {
                //console.log(movie); // Log pour vérifier les données reçues
                setData(movie);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Erreur fetch :", err);
            });
    }, []);

    return (
        <div className='picture-img'>
            {!isLoading ? <img src={data[0].poster_path} alt={data[0].title}></img> : <div>...loading</div>}
        </div>
    )
}

export default Picture;
