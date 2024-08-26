import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for login
export const RegisterEstimate = createAsyncThunk(
  'estimate/RegisterEstimate',
  async (values, { rejectWithValue }) => {
    try {
      let response;
      if(values.id){
        response = await axios.put(`http://localhost:8081/edit-estimate/${Number(values.id)}`, values);
      }else{
         response = await axios.post('http://localhost:8081/estimate', values);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const GetEstimate = createAsyncThunk(
  'estimate/GetEstimate',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8081/estimate/lists', values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const GetEstimatebyID = createAsyncThunk(
  'estimate/GetEstimatebyID',
  async (values, { rejectWithValue }) => {
    const restaurantId = Number(values); // Convert to a number if necessary
    try {
      const response = await axios.get(`http://localhost:8081/estimate-id/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const DeleteEstimatebyID = createAsyncThunk(
  'estimate/DeleteEstimatebyID',
  async (values, {dispatch, rejectWithValue }) => {
    const restaurantId = Number(values); // Convert to a number if necessary
    try {
      const response = await axios.delete(`http://localhost:8081/delete-estimate/${restaurantId}`);
      dispatch(GetEstimate());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Define the slice
const restaurantSlice = createSlice({
  name: 'estimate',
  initialState: {
    addResData: [],
    getRestaurants : [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(RegisterEstimate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterEstimate.fulfilled, (state, action) => {
        state.loading = false;
        state.addResData = action.payload;
      })
      .addCase(RegisterEstimate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetEstimate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetEstimate.fulfilled, (state, action) => {
        state.loading = false;
        state.getRestaurants = action.payload;
      })
      .addCase(GetEstimate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetEstimatebyID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetEstimatebyID.fulfilled, (state, action) => {
        state.loading = false;
        state.getRestaurants = action.payload;
      })
      .addCase(GetEstimatebyID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(DeleteEstimatebyID.fulfilled, (state, action) => {
        state.getRestaurants = state.getRestaurants.filter(restaurant => restaurant.id !== action.payload);
      });
      
  },
});

export default restaurantSlice.reducer;
