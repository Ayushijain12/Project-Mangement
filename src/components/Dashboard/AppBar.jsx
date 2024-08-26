import * as React from 'react';
import PrimarySearchAppBar from '../CustomComponents/PrimarySearchAppBar';
import { Grid, Typography, Box, Paper } from '@mui/material';
import CountCard from '../CustomComponents/CountCard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Chart from './Chart';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      paper: '#fff',
    },
  },
});

export default function AppBar() {

  const userString = JSON.parse(localStorage.getItem('user'));
  const { t } = useTranslation('common'); // Namespace 'common'

  const data = [
    { icon: <PeopleIcon fontSize="small" />, title: `${t('total') + ` ` + t('users')}`, count: '40,589', treding: "yes" },
    { icon: <BookmarkBorderIcon fontSize="small" />, title: `${t('total') + ` ` + t('order')}`, count: '10,678', treding: "no" },
    { icon: <ShoppingCartIcon fontSize="small" />, title: `${t('total') + ` ` + t('sales')}`, count: '80,900', treding: "yes" },
    { icon: <PendingActionsIcon fontSize="small" />, title: `${t('total') + ` ` + t('pending')}`, count: '2040', treding: "no" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PrimarySearchAppBar userObject={userString} t={t} />
      <Box sx={{ padding: '10px', backgroundColor: '#f1f1f1' }}>
        <Typography variant="h4" gutterBottom sx={{ margin: '5px' }}>
          {t("dashboard")}
        </Typography>
        <Grid container spacing={3} justifyContent="space-between">
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CountCard icon={item.icon} title={item.title} count={item.count} treding={item.treding} t={t} style={{ flex: 1 }} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Paper elevation={3} sx={{ width: '100%', height: '510px', padding: 2 }}>
            <Chart t={t}/>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
