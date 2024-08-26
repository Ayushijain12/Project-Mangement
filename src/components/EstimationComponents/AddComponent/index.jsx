import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from '../../CustomComponents/PrimarySearchAppBar';
import CssBaseline from '@mui/material/CssBaseline';
import AddressForm from './AddFrom';
import { Dashboardtheme } from '../../../utils/theme';

const ListPage = () => {
  const { t } = useTranslation();
  const userString = JSON.parse(localStorage.getItem('user'));

  return (
    <ThemeProvider theme={Dashboardtheme}>
      <CssBaseline />
      <PrimarySearchAppBar userObject={userString} t={t} />
      <Box sx={{ padding: '20px', backgroundColor: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h4" gutterBottom>
            {t("add_estimate")}
          </Typography>
        </Box>
        <AddressForm t={t}/>
      </Box>
    </ThemeProvider>
  );
};

export default ListPage;
