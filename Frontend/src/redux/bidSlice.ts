import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config/api";


/* ---------- Types ---------- */

export interface Bid {
  _id: string;
  message: string;
  price: number;
  gigId: {
    _id: string;
    title: string;
    status: "open" | "assigned";
  };
  
  status: "pending" | "hired" | "rejected";
  freelancerId: {
    _id: string;
    name: string;
    email: string;
  };
}

interface BidState {
  bids: Bid[];
  loading: boolean;
  error: string | null;
}

/* ---------- Initial State ---------- */

const initialState: BidState = {
  bids: [],
  loading: false,
  error: null,
};

/* ---------- Create Bid ---------- */

export const createBid = createAsyncThunk(
  "bids/create",
  async (data: { gigId: string; message: string; price: number }, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/bids`, {
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
      return thunkAPI.rejectWithValue("Failed to submit bid");
    }
  }
);

/* ---------- Fetch Bids For Gig ---------- */

export const fetchBidsForGig = createAsyncThunk(
  "bids/fetchForGig",
  async (gigId: string, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/bids/${gigId}`, {
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(result.message);
      }

      return result.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch bids");
    }
  }
);

/* ---------- Hire Bid ---------- */

export const hireBid = createAsyncThunk(
  "bids/hire",
  async (bidId: string, thunkAPI) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/bids/${bidId}/hire`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(result.message);
      }

      return bidId;
    } catch {
      return thunkAPI.rejectWithValue("Failed to hire freelancer");
    }
  }
);

export const fetchMyBids = createAsyncThunk(
  "bids/fetchMyBids",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/bids/my`, {
        credentials: "include",
      });

      const json = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(json.message);
      }

      return json.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch my bids");
    }
  }
);

/* ---------- Slice ---------- */

const bidSlice = createSlice({
  name: "bids",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create bid
      .addCase(createBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBid.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch bids
      .addCase(fetchBidsForGig.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBidsForGig.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload;
      })
      .addCase(fetchBidsForGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Hire bid
      .addCase(hireBid.fulfilled, (state, action) => {
        state.bids = state.bids.map((bid) =>
          bid._id === action.payload
            ? { ...bid, status: "hired" }
            : { ...bid, status: "rejected" }
        );
      })
      // Fetch my bids
      .addCase(fetchMyBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload;
      })
      .addCase(fetchMyBids.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default bidSlice.reducer;
