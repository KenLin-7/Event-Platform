import React from 'react';
import './App.css';
import Header from './components/Header';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box'

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Box>
          <Header />
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default App;
