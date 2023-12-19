import React, {useContext} from 'react';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import { VaultAuth } from './pages/vaultAuth';
import { ThemeContext } from './components/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path="/" element={<VaultAuth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
