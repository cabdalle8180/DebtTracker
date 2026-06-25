import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { clearAuth } from "../auth/authSlice";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentTab = location.pathname.split("/").pop() || "overview";

  const handleTabChange = (tab) => {
    navigate(`/dashboard/${tab}`);
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        onOpenNewEntryModal={() => navigate("/dashboard/debts")}
        preferences={{ shopName: user?.fullName || user?.username || "My Shop" }}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-lg font-bold text-emerald-900 tracking-tight">
              Debt<span className="text-emerald-600">Tracker</span>
            </span>
          </div>
          
          <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
            {user?.fullName || user?.username || "Merchant"}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
