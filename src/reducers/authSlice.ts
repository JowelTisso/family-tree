import { fetchLoggedInUser } from "@/services/authServices";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  authenticated: boolean;
}

const initialState: AuthState = {
  loading: true,
  authenticated: false,
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  await fetchLoggedInUser();
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
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.authenticated = false;
      });
  },
});

export const { logout, updateAuth } = authSlice.actions;
export default authSlice.reducer;
