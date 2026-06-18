import { useSelector } from "react-redux";
import { Settings, User, Mail, Phone, Info, Shield } from "lucide-react";

export default function SettingsPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Settings className="w-8 h-8 text-emerald-600" />
          Merchant Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">Your account and shop profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Profile Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <User className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Full Name</p>
                <p className="text-sm font-semibold text-slate-800">{user?.fullName || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <User className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Username</p>
                <p className="text-sm font-semibold text-slate-800">{user?.username || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Email</p>
                <p className="text-sm font-semibold text-slate-800">{user?.email || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Phone</p>
                <p className="text-sm font-semibold text-slate-800">{user?.phone || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-600" />
            Important Information
          </h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <p className="font-semibold text-emerald-800 mb-1">Customer Feedback</p>
              <p>Record feedback, complaints, praise, and internal notes on each customer profile. Use the Customers page and click a customer to open their detail panel.</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="font-semibold text-amber-800 mb-1">Account Status</p>
              <p>Mark customers as <strong>Active</strong>, <strong>Warning</strong>, or <strong>Blocked</strong> to track payment reliability. Warning and blocked customers appear on the dashboard overview.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="font-semibold text-blue-800 mb-1 flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Data Security
              </p>
              <p>All business data is private to your account. Debts and payments are automatically linked to customers and updated in real time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
