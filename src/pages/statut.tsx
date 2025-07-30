//récupéré le titre, image, description, note et l'afficher sur une nouvelle page
import Banner from "../components/banner";

//CSS
import '../styles/status.scss';

//utils
import { Movie } from "../utils/type";

//React
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function Statut() {
    const location = useLocation();
    //const navigate = useNavigate();

    //La ou va stocker les donnée
    const [movie, setMovie] = useState<Movie>({
        title: "",
        poster_path: "",
        overview: "",
        release_date: "",
        vote_average: 0,
    });//TS veut null

    //const [title, setTitle] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const title = params.get('title');
        const poster_path = params.get('poster_path');
        const overview = params.get('overview');
        const release_date = params.get('release_date');
        const vote_average = params.get('vote_average');

        if (title !== "") {
            let movie = {
                title: title!,
                poster_path: poster_path!,
                overview: overview!,
                release_date: release_date!,
                vote_average: parseFloat(vote_average!),
            }
            setMovie(movie);

        } else {
            let movie = {
                title: "none",
                poster_path: "none",
                overview: "none",
                release_date: "none",
                vote_average: 0,
            }
            setMovie(movie);
        }
        //console.log(movie);
        //console.log('Titre récupéré :', title);
        //setTitle(title);

        // Supprimer "title" de l'URL
        //params.delete('title');

        // Remplacer l'URL actuelle sans recharger la page
        /*
        navigate({
            pathname: location.pathname,
            search: params.toString(),
        }, { replace: true });
        */
    }, [location]);


    return (
        <div>
            <Banner />
            <div className="status-main">
                <h1 className="status-title">{movie.title}</h1>
                <div className="status-overview"> {movie.overview}</div>
                <div className="status-image"><img src={movie.poster_path} alt={movie.title} /></div>
                <div className="status-date"> {movie.release_date}</div>
                <div className="status-vote">Average score : {movie.vote_average}/10</div>
            </div>
        </div>
    )
}

export default Statut;

/*
title : en haut milieu
image : à gauche premier
overview : au milieu 
date : à gauche deuxieme 
vote : à gauche 3e
*/