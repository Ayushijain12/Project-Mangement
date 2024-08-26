import axios from 'axios';

// Define base URL for your API
const BASE_URL = 'http://localhost:8081';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Function to handle POST requests
export const postRequest = async (url, values) => {
  try {
    const response = await api.post(url, values);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const handleSort = (column, sortColumn, sortDirection, setSortDirection, setSortColumn, setProjects) => {
  const isAsc = sortColumn === column && sortDirection === 'asc';
  const newSortDirection = isAsc ? 'desc' : 'asc';
  setSortDirection(newSortDirection);
  setSortColumn(column);
  setProjects((prevProjects) =>
    [...prevProjects].sort((a, b) => {
      if (a[column] < b[column]) return isAsc ? -1 : 1;
      if (a[column] > b[column]) return isAsc ? 1 : -1;
      return 0;
    })
  );
};

export const filterProjects = (projects, searchQuery) => 
  projects.filter((project) =>
    Object.values(project).some(
      (value) =>
        value.toString().toLowerCase().includes(searchQuery)
    )
  );


export const filterProjectsByFields = (projects, filters) => {
  return projects.filter((project) =>
    Object.keys(filters).every((key) =>
      project[key].toLowerCase().includes(filters[key])
    )
  );
};