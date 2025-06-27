//récupéré le titre, image, description, note et l'afficher sur une nouvelle page
import Banner from "../components/banner";

//CSS
import '../styles/status.scss';

//utils
import { Movie } from "../utils/type";

//React
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function Statut() {
    const location = useLocation();
    const navigate = useNavigate();

    //La ou va stocker les donnée
    const [movie, setMovie] = useState<Movie>({
        title: "",
        poster_path: "",
        overview: "",
        release_date: "",
        vote_average: 0,
    });//TS veut null

    const [title, setTitle] = useState('');// améliorer directement en objet 

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const title = params.get('title');

        if (title) {
            let movie = {
                title: title,
                poster_path: "string",
                overview: "string",
                release_date: "string",
                vote_average: 8.5,
            }

            setMovie(movie);
            //console.log(movie);
            //console.log('Titre récupéré :', title);
            setTitle(title);

            // Supprimer "title" de l'URL
            params.delete('title');

            // Remplacer l'URL actuelle sans recharger la page
            navigate({
                pathname: location.pathname,
                search: params.toString(),
            }, { replace: true });
        }
    }, [location, navigate]);


    return (
        <div>
            <Banner />
            test {title} <br></br>
            JE SUIS LA PAGE ET TON FILM C'EST {movie.title}
        </div>
    )
}

export default Statut;