import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchMyNotifications } from "../redux/notificationSlice";

function NotificationsPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchMyNotifications());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>

      {loading && <p>Loading notifications...</p>}

      {!loading && items.length === 0 && (
        <p className="text-sm text-gray-500">No notifications yet</p>
      )}

      <div className="space-y-3">
        {items.map((n) => (
          <div
            key={n._id}
            className={`p-3 rounded-lg border text-sm ${
              n.read ? "bg-gray-100" : "bg-blue-50"
            }`}
          >
            <p className="font-medium">{n.message}</p>
            <span className="text-xs text-gray-500">
              {new Date(n.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPanel;
