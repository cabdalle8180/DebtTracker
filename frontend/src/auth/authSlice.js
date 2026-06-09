import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔐 LOGIN THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🆕 REGISTER / SIGNUP
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, fullName, email, phone, password }, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          fullName,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data; // { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },

  // ✅ THIS IS CORRECT PLACE
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // 🆕 SIGNUP
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  },

});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;