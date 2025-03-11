import './App.scss';
import './index.scss';
import Banner from './components/banner';
import Picture from './components/picture';

import { useState } from 'react';

function App() {

  const [serverUrl, setServerUrl] = useState('http://localhost:3001');

  console.log(serverUrl);
  




  return (
    <div>
      <header> 
        <Banner />
      </header>
      <picture>
        <Picture />
      </picture>

      <main className='main'>
        <h2>trend</h2>
        <div className='main-affiche'>
          <h3 className='main-title'>title</h3>
          <p className='main-date'>release date</p>
          <p className='main-overview'>overview</p>
          <p className='main-vote'>vote average</p>
        </div>
      </main>
    </div>
  );
}

export default App;
