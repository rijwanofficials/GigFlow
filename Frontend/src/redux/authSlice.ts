import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "VERIFIER";
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  phone?: string;
  location?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

/* =========================
   ASYNC ACTIONS (Context → async functions)
========================= */

// 🔹 Login
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (data: { email: string; password: string }, thunkAPI) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/v1/auth/login", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const result = await res.json();
//       console.log("result after login api hit", result);
//       console.log(result.message);
//       return result;
//     } catch {
//       return thunkAPI.rejectWithValue("Login failed");
//     }
//   }
// );

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("result after login api hit", result);

      // 🔥 THIS IS THE MISSING PIECE
      if (!res.ok || result.success === false) {
        return thunkAPI.rejectWithValue(result.message);
      }

      return result; // ✅ only success reaches here
    } catch {
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);

// 🔹 Send OTP
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email: string, thunkAPI) => {
    try {
      await fetch("http://localhost:5000/api/v1/otps/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      return true;
    } catch {
      return thunkAPI.rejectWithValue("Failed to send OTP");
    }
  }
);

// 🔹 Signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (
    data: {
      email: string;
      otp: string;
      name: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      return json.user;
    } catch {
      return thunkAPI.rejectWithValue("Signup failed");
    }
  }
);

// 🔹 Fetch Profile
export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/users/profile", {
        credentials: "include",
      });

      const json = await res.json();
      return json.user;
    } catch {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);

// 🔹 Logout API call
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      return true;
    } catch {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

// 🔹 Upload Avatar
export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (file: File, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("http://localhost:5000/api/v1/users/avatar", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(json.message);
      }

      return json.user; // contains avatar
    } catch {
      return thunkAPI.rejectWithValue("Avatar upload failed");
    }
  }
);

/* =========================
   SLICE (Context → createContext + Provider)
========================= */

const authSlice = createSlice({
  name: "auth",
  initialState,

  /* ---------- Sync reducers (Context → setState) ---------- */
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearError(state) {
      state.error = null;
    },
  },

  /* ---------- Async lifecycle handling ---------- */
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // SEND OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // PROFILE
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // AVATAR UPLOAD
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.avatar = action.payload.avatar;
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* =========================
   EXPORTS (Context → exposed methods)
========================= */

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
