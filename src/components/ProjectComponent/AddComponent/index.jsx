import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PrimarySearchAppBar from '../../CustomComponents/PrimarySearchAppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { handleSort, filterProjects } from '../../../utils/api';
import AddressForm from './AddFrom';

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

const ListPage = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState('asc');
  const [sortColumn, setSortColumn] = React.useState('name');
  const [searchQuery, setSearchQuery] = React.useState('');

  // Handle sorting
  const handleSortClick = (column) => {
    handleSort(column, sortColumn, sortDirection, setSortDirection, setSortColumn, setProjects);
  };

  // Handle search query
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filtered projects based on search query
  const filteredProjects = filterProjects(projects, searchQuery);

  const userString = JSON.parse(localStorage.getItem('user'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PrimarySearchAppBar userObject={userString} t={t} />
      <Box sx={{ padding: '20px', backgroundColor: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h4" gutterBottom>
            {t("add_project")}
          </Typography>
        </Box>
        <AddressForm t={t}/>
      </Box>
    </ThemeProvider>
  );
};

export default ListPage;
