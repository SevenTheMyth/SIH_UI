import React, { useState, useEffect } from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton, Switch, Avatar, Container, } from '@mui/material';

import Header from '../components/header';
import DarkCommScene from '../scenes/darkCommScene';
import ChatApp from '../components/chat';

const Communication = () => {
  
  return (
    <>
      <DarkCommScene />
      <Box sx={{ zIndex: '5 ', display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent:'center', width:'100vw', height:'auto', margin: '0', padding: '0'}}>
        <Box sx={{zIndex: '5', padding: '20px 50px', width: '90%'}}>
            <Header />
        </Box>
        <Box sx={{zIndex: '10', width: '100%', height: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <ChatApp />
        </Box>
      </Box>
    </>
    
  );
};
 
export default Communication;
