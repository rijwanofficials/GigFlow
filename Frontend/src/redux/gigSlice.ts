import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../App";

export interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
  ownerId: {
    _id: string;
    name: string;
    email: string;
  };
}

interface GigState {
  gigs: Gig[];
  loading: boolean;
  error: string | null;
}

const initialState: GigState = {
  gigs: [],
  loading: false,
  error: null,
};

/* ---------------- GET GIGS ---------------- */

export const fetchGigs = createAsyncThunk(
  "gigs/fetch",
  async (search: string | undefined, thunkAPI) => {
    try {
      const query = search ? `?search=${search}` : "";
      const res = await fetch(
        `${API_BASE_URL}/api/v1/gigs${query}`,
        {
          credentials: "include",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(result.message);
      }

      return result.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch gigs");
    }
  }
);

/* ---------------- POST GIG ---------------- */

export const createGig = createAsyncThunk(
  "gigs/create",
  async (
    data: { title: string; description: string; budget: number },
    thunkAPI
  ) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/gigs`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(result.message);
      }

      return result.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to create gig");
    }
  }
);

const gigSlice = createSlice({
  name: "gigs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* fetch gigs */
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* create gig */
      .addCase(createGig.fulfilled, (state, action) => {
        state.gigs.unshift(action.payload);
      });
  },
});

export default gigSlice.reducer;
