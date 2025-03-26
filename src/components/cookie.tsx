function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift() ?? null;
      console.log('Cookie trouvé:', cookieValue); // Affiche le cookie trouvé
      return cookieValue;
  }
  console.log('Cookie non trouvé');
  return null; // Si le cookie n'existe pas
}

// Array de l'id et nom de l'utilisateur
function getUsersFromCookie() {
  const cookie = getCookie('authToken'); // Récupère le cookie 'userDataArray'

  if (cookie) {
      console.log('Cookie avant parsing:', cookie); // Affiche la valeur du cookie avant le parsing
      try {
          const usersArray = JSON.parse(cookie); // Parse le cookie en tableau d'objets
          console.log('Array des utilisateurs:', usersArray); // Affiche l'array des utilisateurs après parsing

          // Filtrer et extraire id et name de chaque objet
          return usersArray.map((user: any) => ({
              id: user.id,
              name: user.name,
          }));
      } catch (error) {
          console.error('Erreur lors du parsing du cookie:', error);
      }
  }
  return null;
}

function Cookie() {
  fetch('http://localhost:3001/protected', {
    method: 'GET', // Méthode de la requête
    credentials: 'include',  // Important pour inclure les cookies dans la requête
  })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Accès autorisé') {
            console.log('Utilisateur authentifié');
        } else {
            console.log('Erreur:', data.message);
        }
    })
    .catch(error => {
        console.error('Erreur de la requête:', error);
    });

  /*
  const user = getUsersFromCookie();
  if (user) {
    console.log('Utilisateur récupéré:', user); // Affiche l'utilisateur récupéré
    return user;
  } else {
    console.log('Aucun utilisateur trouvé');
    return null;
  }
  */
}

export default Cookie;
