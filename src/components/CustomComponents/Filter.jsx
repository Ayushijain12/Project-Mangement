import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const handleFilterChange = (field) => (event) => {
  setFilters({
    ...filters,
    [field]: event.target.value
  });
};

// Example filter for the 'name' field
<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
  <Select
    value={filters.name}
    onChange={handleFilterChange('name')}
    displayEmpty
    inputProps={{ 'aria-label': 'Name Filter' }}
    sx={{ marginRight: '10px' }}
  >
    <MenuItem value=""><em>All</em></MenuItem>
    {/* Replace the options below with dynamic values if available */}
    <MenuItem value="Project A">Project A</MenuItem>
    <MenuItem value="Project B">Project B</MenuItem>
  </Select>

  {/* Repeat similar blocks for other fields */}
</Box>
