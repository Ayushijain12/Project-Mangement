import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';


const TemporaryDrawer = ({ open, onClose, t }) => {
  const navigate = useNavigate();

  const handleClose = (text) => {
    console.log(text);
    if(text === 0){
      navigate('/');
      return;
    }
    
    if(text === 1){
      navigate('/project');
      return;
    }

    if(text === 2){
      navigate('/estimate');
      return;
    }

  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        {[`${t('dashboard')}`, `${t('projects')}`, `${t('estimates')}`].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => {handleClose(index)}}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
    >
      {DrawerList}
    </Drawer>
  );
};

export default TemporaryDrawer;
