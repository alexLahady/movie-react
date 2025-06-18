import Cookie from "./cookie";

interface Movie {
    id: number;
    title: string;
    poster_path : string;
    overview: string;
    release_date: string;
    vote_average: number;

}

interface UserMovie {
    id: number;
    title: string;
    poster_path : string;
    userId: number;
    overview: string;
    release_date: string;
    vote_average: number;

}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
}

const handleDelete = async (userId : number, element: Movie) => {
    let deleteElement = { userId: userId , title : element.title}
    let url = 'http://localhost:3001/delete/movie';
    await Cookie(false, url, 'DELETE', deleteElement);

    window.location.reload();
}

const handlePush = async ( userId : number , element : Movie) => {
    let newElement = {title :  element.title ,poster_path : element.poster_path, overview : element.overview, release_date : element.release_date, vote_average : element.vote_average};
    let url = `http://localhost:3001/me/movies/${userId}`;
    await Cookie(false,url,'POST',newElement);

    window.location.reload();
}

// let newElement = {title :  element.title , overview : element.overview, release_date : element.release_date, vote_average : element.vote_average};

const pushOrDelete = (userId : number, library: boolean, connect: boolean, userMovies: UserMovie[], element: Movie) => {
    //const safeUserMovies = userMovies ?? [];
    if (library) {
        return <button onClick={() => handleDelete(userId , element)}>Delete</button>
    } else if (connect === false) {
        return (<div></div>);
    } else {
        let foundMovie = userMovies.some((user) => user.title === element.title);
        return foundMovie ? (<button onClick={() => handleDelete(userId , element)}>Delete</button>) : (<button onClick={() => handlePush(userId,element)}>Push</button>);
    }
}

function Box(isLoading: boolean, movies: Movie[], userMovies?: UserMovie[], userId? :  number) {
    const safeUserMovies = userMovies ?? [];
    //console.log('normalement tu es vide :'+safeUserMovies.length);

    const safeUserId = userId ?? 0;

    const library = safeUserMovies.length === 0;
    //console.log('library :' +library)

    const connect = safeUserMovies.length === 0 ? false : true;
    //console.log('tu es la connection :'+connect);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                movies.map((element) => (
                    <div className='library-affiche' key={element.id}>
                        <h3 className='library-title'>{`Title: ${element.title || 'No title available'}`}</h3>
                        <p className='library-date'>{`Date: ${formatDate(element.release_date) || 'No date available'}`}</p>
                        <p className='library-overview'>{`Overview: ${element.overview || 'No overview available'}`}</p>
                        <p className='library-vote'>{`Vote: ${element.vote_average || 'No vote available'}`}</p>
                        {pushOrDelete(safeUserId, library, connect, safeUserMovies, element)}
                    </div>
                ))
            )}
        </div>
    )
}

export default Box; 