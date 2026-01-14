import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { API_BASE_URL } from "../App";

export interface Notification {
  _id: string;
  type: "hired";
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  items: Notification[];
  loading: boolean;
}

const initialState: NotificationState = {
  items: [],
  loading: false,
};

// 🔹 Fetch stored notifications from DB
export const fetchMyNotifications = createAsyncThunk(
  "notifications/fetchMy",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/my`, {
        credentials: "include",
      });

      const json = await res.json();
      return json.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to load notifications");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyNotifications.fulfilled, (state, action) => {
        state.loading = false;
        const existingIds = new Set(state.items.map((n) => n._id));
        const newItems = action.payload.filter(
          (n: Notification) => !existingIds.has(n._id)
        );
        state.items = [...newItems, ...state.items];
      })
      .addCase(fetchMyNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
