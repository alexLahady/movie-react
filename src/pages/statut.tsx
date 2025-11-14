//récupéré le titre, image, description, note et l'afficher sur une nouvelle page
import Banner from '../components/banner';

//CSS
import '../styles/status.scss';

//React
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function Statut() {
  const location = useLocation();
  const movie = useMemo(() => {
    const params = new URLSearchParams(location.search);

    return {
      title: params.get('title') || 'none',
      poster_path: params.get('poster_path') || 'none',
      overview: params.get('overview') || 'none',
      release_date: params.get('release_date') || 'none',
      vote_average: parseFloat(params.get('vote_average') || '0'),
    };
  }, [location.search]);

  return (
    <div>
      <Banner />
      <div className="status-main">
        <h1 className="status-title">{movie.title}</h1>
        <div className="status-overview"> {movie.overview}</div>
        <div className="status-image">
          {movie.poster_path !== 'none' && <img src={movie.poster_path} alt={movie.title} />}
        </div>
        <div className="status-date"> {movie.release_date}</div>
        <div className="status-vote">Average score : {movie.vote_average}/10</div>
      </div>
    </div>
  );
}

export default Statut;

/*
title : en haut milieu
image : à gauche premier
overview : au milieu 
date : à gauche deuxieme 
vote : à gauche 3e
*/
