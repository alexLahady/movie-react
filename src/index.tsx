import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import Home from './pages/Home'
import Browser from './pages/Browser';
import Library from './pages/Library';
import Login from './pages/Login';

//import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} /> {/* accueil et l'api */}
      <Route path="/me/movies" element={<Library />} /> {/* accueil et l'api */}
      <Route path="/user" element={<Login />} /> {/* accueil et l'api */}
      <Route path="/browser" element={<Browser />} /> {/* accueil et l'api */}
    </Routes>
    </BrowserRouter>
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
