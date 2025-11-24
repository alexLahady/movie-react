# React Popular Movies

Frontend application built with React to display popular movies and manage a list of favorites via an external backend.

## Installation

1. Clone the project

```
https://github.com/alexLahady/movie-react.git
cd movie-react
```

2. Install dependencies

```
npm install
```

3. Configure the environment

Create a `.env` file:

```
REACT_APP_BASE_URL_DEV=http://localhost:3001
REACT_APP_BASE_URL_PROD=https://api.monsite.com
```

### Run the project

```
npm run dev
```

(or `npm start` depending on your setup)

## Features

* Display popular movies (via backend)
* User registration / login
* Add and remove favorites
* Dedicated page to view user favorites
