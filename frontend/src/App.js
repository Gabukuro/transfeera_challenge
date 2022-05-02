import { BrowserRouter } from 'react-router-dom';
import Router, { links } from './router';
import NavBar from './Components/NavBar/';

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <NavBar links={links} />
      <Router />
    </BrowserRouter>
  );
}

export default App;
