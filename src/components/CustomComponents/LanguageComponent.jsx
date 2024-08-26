import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MENU_ID } from '../../constants/routes';

const LanguageComponent = ({ anchorEl, isMenuOpen, handleClose, onLanguageChange }) => {

  const handleMenuItemClick = (language) => {
    if (onLanguageChange) {
      onLanguageChange(language);
    }
    handleClose(); // Close the menu
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={MENU_ID}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleClose}
    >
      <MenuItem onClick={() => handleMenuItemClick('en')}>English</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('hi')}>Hindi</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('fr')}>French</MenuItem>
    </Menu>
  );
};

export default LanguageComponent;
