// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../utils/api';
import {
  LOGIN_URL,
  SIGNUP_URL,
  FORGET_PASSWORD_URL,
  VERIFY_OTP_URL,
  CHANGE_PASSWORD_URL
} from '../../constants/routes';

// Define async thunks
export const loginToEmp = createAsyncThunk(
  'auth/loginToEmp',
  async (values, { rejectWithValue }) => {
    try {
      return await postRequest(LOGIN_URL, values);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const RegisterToEmp = createAsyncThunk(
  'auth/RegisterToEmp',
  async (values, { rejectWithValue }) => {
    try {
      return await postRequest(SIGNUP_URL, values);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const ForgetPasswordToEmp = createAsyncThunk(
  'auth/ForgetPasswordToEmp',
  async (values, { rejectWithValue }) => {
    try {
      return await postRequest(FORGET_PASSWORD_URL, values);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const OTPPasswordToEmp = createAsyncThunk(
  'auth/OTPPasswordToEmp',
  async (values, { rejectWithValue }) => {
    try {
      return await postRequest(VERIFY_OTP_URL, values);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (values, { rejectWithValue }) => {
    try {
      return await postRequest(CHANGE_PASSWORD_URL, values);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logindata: [],
    addResData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginToEmp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginToEmp.fulfilled, (state, action) => {
        state.loading = false;
        state.logindata = action.payload;
      })
      .addCase(loginToEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Repeat the above pattern for other async thunks if needed
  },
});

export default authSlice.reducer;
