import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import projectReducer from './Slice/projectSlice';
import estimateReducer from './Slice/estimateSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    estimate : estimateReducer,
  },
});

export default store;
