// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import gigReducer from "./gigSlice";
import bidReducer from "./bidSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gig: gigReducer,
    bids: bidReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
