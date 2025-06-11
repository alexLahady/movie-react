//amélioration futur

/*
Faire une fonction qui prend en compte:
si on est connecté
si on veut afficher avec GET
si on veut ajouter login, signup ou favorite avec POST
si on veut supprimer avec DELETE


Paramètre:
variable pour savoir si on est connecté
l'url pour le backend
la methode pour le backend
*/

interface DataUser {
    email: string;
    password: string;
}

interface DeleteMovie {
    userId : number;
    title : string;
}

interface CreateData {
    email: string;
    name : string;
    password: string;
}

interface Movie {
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}



function Cookie(connect = false, url? : string,  methode? :"GET" | "POST" | "PUT" | "DELETE", data? : DataUser | CreateData | Movie | DeleteMovie) {
     const validUrl = url ?? ""; // verifie si l'url n'est pas null ou undifinied
    
    if(connect){
        return fetch('https://movie-test-vercel-delta.vercel.app/pro/pro', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include'
          }).then(response => response.json())
    } else if(data) {
        return fetch(validUrl, {
            method: methode,
            credentials: 'include',
            //mode:'cors',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } else {
        return fetch(validUrl, {
            method: methode,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(response => response.json())
    }
   
}
export default Cookie;