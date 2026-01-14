import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import { fetchProfile } from "./redux/authSlice";
import AppRoutes from "./AppRoutes";
import { connectSocket, getSocket } from "./socket/socket";
import { ShowSuccessToast } from "./utils/toast";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  // 1️⃣ Fetch profile on app load
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // 2️⃣ Connect socket AFTER user is available
  useEffect(() => {
    if (user?.id) {
      connectSocket(user.id);
    }
  }, [user?.id]);

  // 3️⃣ Listen for hired event (GLOBAL)
  
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleHired = (data: { gigId: string; title: string }) => {
      ShowSuccessToast(`🎉 You have been hired for gig: ${data.title}`);
    };

    // { gigId, title }
    socket.on("hired", handleHired);
    return () => {
      socket.off("hired", handleHired);
    };
  }, []);

  return <AppRoutes />;
}

export default App;
