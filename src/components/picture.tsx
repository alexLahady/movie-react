//utils
import { Movie, apiUrl } from '../utils/type';

//CSS
import '../styles/picture.scss';

//React
import { useEffect, useState } from 'react';

function Picture() {
    //data pour récupéré les images
    const [data, setData] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //slide
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        fetch(apiUrl, {
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


    const handlePrev = () => {
        setStartIndex((prev) => (prev - 1 + data.length) % data.length);
    };

    const handleNext = () => {
        setStartIndex((prev) => (prev + 1) % data.length);
    };

    const visibleImages =
        data.length >= 3
            ? [
                data[(startIndex - 1 + data.length) % data.length], // gauche dernière image
                data[startIndex % data.length],                     // centre première image
                data[(startIndex + 1) % data.length],               // droite image suivante
            ]
            : [];

    console.log(visibleImages);


    return (
        <div className='picture-img'>
            {!isLoading ?
                <div className="slider">
                    <button onClick={handlePrev}>◀</button>
                    <div className="slider-container">
                        {visibleImages.map((element, index) => (
                            <img src={element.poster_path} alt={data[index].title} />
                        ))}
                    </div>
                    <button onClick={handleNext}>▶</button>
                </div>
                : <div>...loading</div>}
        </div>
    )
}

export default Picture;
