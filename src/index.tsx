import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import Browser from './components/movies/MovieList';
import Library from './components/users/UserProfile';
import Login from './components/auth/LoginForm';
import Signup from './components/auth/RegisterForm';
import Statut from './pages/statut';
import { AuthProvider } from './components/auth/authContext';

//import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/me/movies" element={<Library />} />
          <Route path="/user" element={<Login />} />
          <Route path="/browser" element={<Browser />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/status" element={<Statut />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
