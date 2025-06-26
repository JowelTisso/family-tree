import { fetchLoggedInUser } from "@/services/authServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  authenticated: boolean;
}

const initialState: AuthState = {
  loading: true,
  authenticated: false,
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await fetchLoggedInUser();
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.authenticated = false;
      state.loading = false;
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
