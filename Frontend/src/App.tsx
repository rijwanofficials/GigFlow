import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import { fetchProfile } from "./redux/authSlice";
import AppRoutes from "./AppRoutes";
import { connectSocket, getSocket } from "./socket/socket";
import { ShowSuccessToast } from "./utils/toast";
import { addNotification } from "./redux/notificationSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  // Fetch profile once
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Connect socket after login
  useEffect(() => {
    if (user?.id) {
      connectSocket(user.id);
    }
  }, [user?.id]);

  // Global hired listener
  useEffect(() => {
    if (!user?.id) return;

    const socket = getSocket();
    if (!socket) return;

    const handleHired = (data: { gigId: string; title: string }) => {
      // Toast (UX)
      ShowSuccessToast(`🎉 You have been hired for gig: ${data.title}`);

      // 🔔 Store in Redux (IMPORTANT)
      dispatch(
        addNotification({
          _id: crypto.randomUUID(),
          type: "hired",
          message: `You have been hired for "${data.title}"`,
          read: false,
          createdAt: new Date().toISOString(),
        })
      );
    };

    socket.on("hired", handleHired);

    return () => {
      socket.off("hired", handleHired);
    };
  }, [user?.id]);

  return <AppRoutes />;
}


export default App;
