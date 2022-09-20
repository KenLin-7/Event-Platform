import React from 'react';
import './App.css';
import Header from './components/Header';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box'
import Home from './components/HomePage/Home'

function App() {
  return (
    <React.Fragment>
      <CssBaseline />

          <Header />
          <Home />

    </React.Fragment>
  );
}

export default App;
