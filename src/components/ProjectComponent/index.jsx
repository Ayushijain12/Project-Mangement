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
import { GetProjects, DeleteProjectbyID } from '../../redux/Slice/projectSlice';
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
        const result = await dispatch(GetProjects());
        const response = result.payload;

        const filteredProjects = response.map(response => ({
          id: response.id,
          name: response.project_name || '',
          number: response.project_number || '',
          area: response.area || '',
          address: response.address || '',
          contact: response.contact || '',
          manager: response.manager || '',
          staff: response.staff || '',
        }));

        setProjects(filteredProjects);
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
    navigate(`/edit/project/${id}`);
  };

  const handleDelete = async (id) => {
    await dispatch(DeleteProjectbyID(id));
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
            {t("projects")}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/add/project')}>
            {t("add_project")}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <TextField
            variant="outlined"
            placeholder={t("search")}
            size="small"
            sx={{ width: '100%' }} // Full width
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
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
