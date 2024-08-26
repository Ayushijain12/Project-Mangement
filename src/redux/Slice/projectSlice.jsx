import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for login
export const RegisterProject = createAsyncThunk(
  'project/RegisterProject',
  async (values, { rejectWithValue }) => {
    try {
      let response;
      if(values.id){
        response = await axios.put(`http://localhost:8081/edit-projects/${Number(values.id)}`, values);
      }else{
         response = await axios.post('http://localhost:8081/projects', values);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const GetProjects = createAsyncThunk(
  'project/GetProjects',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8081/projects/lists', values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const GetProjectsbyID = createAsyncThunk(
  'project/GetProjectsbyID',
  async (values, { rejectWithValue }) => {
    const restaurantId = Number(values); // Convert to a number if necessary
    try {
      const response = await axios.get(`http://localhost:8081/projects-id/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const DeleteProjectbyID = createAsyncThunk(
  'project/DeleteProjectbyID',
  async (values, {dispatch, rejectWithValue }) => {
    const restaurantId = Number(values); // Convert to a number if necessary
    try {
      const response = await axios.delete(`http://localhost:8081/delete-projects/${restaurantId}`);
      dispatch(GetProjects());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Define the slice
const restaurantSlice = createSlice({
  name: 'project',
  initialState: {
    addResData: [],
    getRestaurants : [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(RegisterProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterProject.fulfilled, (state, action) => {
        state.loading = false;
        state.addResData = action.payload;
      })
      .addCase(RegisterProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.getRestaurants = action.payload;
      })
      .addCase(GetProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetProjectsbyID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetProjectsbyID.fulfilled, (state, action) => {
        state.loading = false;
        state.getRestaurants = action.payload;
      })
      .addCase(GetProjectsbyID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(DeleteProjectbyID.fulfilled, (state, action) => {
        state.getRestaurants = state.getRestaurants.filter(restaurant => restaurant.id !== action.payload);
      });
      
  },
});

export default restaurantSlice.reducer;
