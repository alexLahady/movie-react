//utils
import { Movie } from '../utils/type';

//CSS
import '../styles/picture.scss';

//React
import { useEffect, useState } from 'react';

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
                setData(movie.slice(0, 6));
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
