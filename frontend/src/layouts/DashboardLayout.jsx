import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { clearAuth } from "../auth/authSlice";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const currentTab = location.pathname.split("/").pop() || "overview";

  const handleTabChange = (tab) => {
    navigate(`/dashboard/${tab}`);
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        onOpenNewEntryModal={() => navigate("/dashboard/debts")}
        preferences={{ shopName: user?.fullName || user?.username || "My Shop" }}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
