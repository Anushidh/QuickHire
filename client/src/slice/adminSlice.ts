import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import  { AxiosError } from 'axios';
import axios from '../utils/axios'

interface User {
  id: string;
  email: string;
  name: string;
  // Add any other properties that your user object might have
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string;
  // Add any other properties that your error response might have
}

export const loginAdmin = createAsyncThunk<
  User,
  LoginCredentials,
  {
    rejectValue: ErrorResponse
  }
>(
  'admin/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('inside login')
      const response = await axios.post<User>('/api/admin/login', credentials);
      console.log('Full response:', response);
      console.log('Response headers:', response.headers);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (!axiosError.response) {
        throw error;
      }
      return rejectWithValue(axiosError.response.data);
    }
  }
);

interface AdminState {
  user: User | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: ErrorResponse | null;
}

const initialState: AdminState = {
  user: null,
  loading: 'idle',
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload ?? { message: 'An unknown error occurred' };
      });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;