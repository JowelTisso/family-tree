import { fetchLoggedInUser } from "@/services/authServices";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  authenticated: boolean;
  user: Record<string, string>;
}

const initialState: AuthState = {
  loading: true,
  authenticated: false,
  user: {},
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await fetchLoggedInUser();
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.authenticated = false;
      state.loading = false;
    },
    updateAuth: (state, action: PayloadAction<AuthState>) => {
      state.loading = action.payload.loading;
      state.authenticated = action.payload.authenticated;
      state.user = action.payload.user;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        state.user = action.payload.data;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.authenticated = false;
      });
  },
});

export const { logout, updateAuth } = authSlice.actions;
export default authSlice.reducer;
