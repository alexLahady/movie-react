//Services
import { allMovies } from '../services';

//type
import { ApiMovies } from '../types/movies';

//CSS
import '../styles/picture.scss';

//React
import { useState } from 'react';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

const fetcher = () => allMovies();

function Picture() {
  //slide
  const [startIndex, setStartIndex] = useState(0);

  const { data, error, isLoading } = useSWR<ApiMovies[]>('allMovies', fetcher);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error Data</p>;
  const movie = data?.slice(0, 6) || [];

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + movie.length) % movie.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % movie.length);
  };

  const visibleImages =
    movie.length >= 3
      ? [
          movie[(startIndex - 1 + movie.length) % movie.length], // gauche dernière image
          movie[startIndex % movie.length], // centre première image
          movie[(startIndex + 1) % movie.length], // droite image suivante
        ]
      : [];

  return (
    <div className="picture-img">
      {!isLoading ? (
        <div className="slider">
          <button onClick={handlePrev}>◀</button>
          <div className="slider-container">
            {visibleImages.map((element, index) => (
              <Link
                key={`${element.id}-${index}`}
                to={`/status?title=${element.title}&poster_path=${element.poster_path}&overview=${element.overview}&release_date=${element.release_date}&vote_average=${element.vote_average}`}
              >
                <img src={element.poster_path} alt={movie[index].title} />
              </Link>
            ))}
          </div>
          <button onClick={handleNext}>▶</button>
        </div>
      ) : (
        <div>...loading</div>
      )}
    </div>
  );
}

export default Picture;
