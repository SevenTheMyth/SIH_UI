import React, { useContext } from "react";
import {Box, Typography, IconButton, Stack, } from '@mui/material';
import { ReactComponent as Logo } from "../assets/logo/aicte-logo.png";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from "./theme";
import logoLight from '../assets/logo/logo-light.png';
import logoDark from '../assets/logo/logo-dark.png';
import fontLight from '../assets/logo/light-logo-font.png';
import fontDark from '../assets/logo/dark-logo-font.png';
import "../App.css";

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const getColor = () => {
      if (theme === 'dark-theme')
        return {fontFamily: 'Pacifico' , fontWeight: '1000', fontSize: '28px', color: '#E6E6DF',}
      else 
        return {color: "#070815"}; 
    };

    return (
      <>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" 
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: 'none', zIndex:'5'}}>
          <img src={theme === 'dark-theme'? fontDark: fontLight} alt="AICTE Logo" width='150px' height='auto' />
          <img src={theme === 'dark-theme'? logoDark: logoLight} alt="AICTE Logo" width='auto' height='60px' href="https://www.aicte-india.org/" target="_blank" 
           sx={{ '&:hover': {cursor: 'pointer'} }}/>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={2}>
            <DarkModeSwitch
                checked={theme === 'dark-theme'}
                moonColor='#f6f1d5'
                sunColor='#FDB813'
                onChange={toggleTheme}
                size={30}
            />
            <IconButton>
              <SettingsIcon sx={{ color: theme === 'dark-theme'? '#E6E6DF': '#070815', fontSize: '28px' }} />
            </IconButton>
            <IconButton>
              <AccountCircleIcon sx={{ color: theme === 'dark-theme'? '#E6E6DF': '#070815', fontSize: '28px' }} />
            </IconButton>             
          </Stack>
        </Stack>
      </>
    );
  };
  
  export default Header;
  