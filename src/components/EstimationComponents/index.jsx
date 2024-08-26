import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from '../CustomComponents/PrimarySearchAppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { handleSort, filterProjects } from '../../utils/api';
import { columns } from './constants';
import { useNavigate } from 'react-router-dom';
import DataTable from '../CustomComponents/DataTable';
import { GetEstimate, DeleteEstimatebyID } from '../../redux/Slice/estimateSlice';
import { useDispatch } from 'react-redux';
import { Dashboardtheme } from '../../utils/theme';
import debounce from 'lodash.debounce';

const ListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(GetEstimate());
        const response = result.payload;
  
        const filteredEstimates = response.map(estimate => ({
          id: estimate.id,
          version: estimate.version || '',
          project: estimate.project || '',
          client: estimate.client || '',
          created_date: estimate.created_date || '',
          last_modified_date: estimate.last_modified_date || '',
          status: estimate.status || '',
        }));
  
        setProjects(filteredEstimates);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, [dispatch, isDeleted]);
  

  const handleSortClick = (column) => {
    handleSort(column, sortColumn, sortDirection, setSortDirection, setSortColumn, setProjects);
  };

  const debouncedSearch = debounce((value) => {
    setSearchQuery(value.toLowerCase());
  }, 300);

  const handleSearch = (event) => {
    debouncedSearch(event.target.value);
  };

  const handleEdit = (id) => {
    navigate(`/edit/estimate/${id}`);
  };

  const handleDelete = async (id) => {
    await dispatch(DeleteEstimatebyID(id));
    setIsDeleted(true);
  };

  const filteredProjects = filterProjects(projects, searchQuery);

  return (
    <ThemeProvider theme={Dashboardtheme}>
      <CssBaseline />
      <PrimarySearchAppBar userObject={JSON.parse(localStorage.getItem('user'))} t={t} />
      <Box sx={{ padding: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h4" gutterBottom>
            {t("estimates")}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/add/estimate')}>
            {t("add_estimate")}
          </Button>
        </Box>

        <DataTable
          t={t}
          columns={columns(t)}
          data={filteredProjects}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSortClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
    </ThemeProvider>
  );
};

export default ListPage;
