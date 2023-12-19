import React, {useContext} from 'react';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import { VaultAuth } from './pages/vaultAuth';
import { ThemeContext } from './components/theme';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <VaultAuth />
    </div>
  );
}

export default App;
