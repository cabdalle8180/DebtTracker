import {
  Users,
  Search,
  Bell,
  Calendar,
  Download,
  MoreHorizontal,
  CreditCard,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  Filter,
  Settings
} from "lucide-react";
import {useSelector} from "react-redux";

export default function OverviewTab() {
  const { user } = useSelector((state) => state.auth);
  // console.log("Authenticated user in DashboardLayoutNoSidebar:", user);
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col">
      
      {/* ================= HEADER ================= */}
      <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">
        {/* App Logo & Search Bar */}
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-[#0f5132] tracking-tight">DebtTracker</span>
          
          <div className="relative w-80 hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customers or records..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-slate-300 transition-colors"
            />
          </div>
        </div>

        {/* Right Header Utilities */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-600 rounded-full"></span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-1"></div>

          {/* Profile Avatar Context */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{user?.username}</p>
              <p className="text-[10px] text-emerald-600 font-medium">Shop Manager</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100"
              alt="Ahmed Ali profile"
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-100"
            />
          </div>
        </div>
      </header>

      {/* ================= VIEWPORT MAIN WORKSPACE ================= */}
      <main className="flex-1 p-8 space-y-6 max-w-[1600px] w-full mx-auto">
        
        {/* Dashboard Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-sm text-slate-500 mt-0.5">Welcome back, track your business debts and payments.</p>
          </div>
          
          {/* Filter Actions */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <Calendar className="w-4 h-4 text-slate-500" />
              Last 30 Days
            </button>
            <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-4 h-4 text-slate-500" />
              Export
            </button>
          </div>
        </div>

        {/* ================= SUMMARY METRICS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Debt */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-red-600" />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                +2.4%
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-xs uppercase tracking-wide font-medium">Total Debt</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">$12,450.00</h2>
            </div>
          </div>

          {/* Total Customers */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                +12
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-xs uppercase tracking-wide font-medium">Total Customers</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">156</h2>
            </div>
          </div>

          {/* Payments Received Today */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                8 rec'd
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-xs uppercase tracking-wide font-medium">Payments Received Today</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">$840.50</h2>
            </div>
          </div>

          {/* Active Debts */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-violet-600" />
              </div>
              <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-xs uppercase tracking-wide font-medium">Active Debts</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">42</h2>
            </div>
          </div>
        </div>

        {/* ================= MIDDLE SECTION (TREND CHART & TOP CUSTOMERS) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Trend Graph Container */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between min-h-[320px]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Debt Summary Trend</h3>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00a86b]"></span> Collections
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> New Debt
                </span>
              </div>
            </div>
            
            {/* Timeline label row */}
            <div className="flex-1 flex items-end justify-between px-4 pt-10 text-[10px] font-bold text-slate-400 tracking-wider">
              <span>JAN</span>
              <span>FEB</span>
              <span>MAR</span>
              <span>APR</span>
              <span>MAY</span>
              <span>JUN</span>
            </div>
          </div>

          {/* Right: Top Customers Sidebar Panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-base mb-5">Top Customers</h3>
              <div className="space-y-4">
                {/* Row 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center">JD</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Jama Duale</h4>
                      <p className="text-[11px] text-slate-400">Last paid 2 days ago</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-red-600">$1,200</span>
                </div>
                {/* Row 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center">MF</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Muna Farah</h4>
                      <p className="text-[11px] text-slate-400">Last paid today</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-800">$450</span>
                </div>
                {/* Row 3 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-violet-50 text-violet-700 font-bold text-xs flex items-center justify-center">AH</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Abdi Hassan</h4>
                      <p className="text-[11px] text-red-500 font-medium">Overdue by 5 days</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-red-600">$2,100</span>
                </div>
              </div>
            </div>

            <button className="w-full text-center text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-4 mt-4 border-t border-slate-100 transition-colors">
              View all customers
            </button>
          </div>
        </div>

        {/* ================= BOTTOM SECTION (RECENT TRANSACTIONS TABLE) ================= */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-base">Recent Transactions</h3>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                  <th className="py-3 px-6">Customer Name</th>
                  <th className="py-3 px-6">Transaction Type</th>
                  <th className="py-3 px-6">Amount</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {/* Item 1 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">JD</div>
                    <span className="font-bold text-slate-800">Jama Duale</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                      <span className="w-3 h-3 rounded-full border border-emerald-600 flex items-center justify-center text-[9px] font-extrabold">+</span>
                      New Debt
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">$150.00</td>
                  <td className="py-4 px-6 text-slate-400 text-xs">Oct 24, 2023</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold text-orange-600 bg-orange-50 rounded-full uppercase tracking-wider">Pending</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4 mx-auto" /></button>
                  </td>
                </tr>

                {/* Item 2 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">MF</div>
                    <span className="font-bold text-slate-800">Muna Farah</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold">
                      <span className="w-3.5 h-3.5 rounded bg-blue-50 flex items-center justify-center text-[9px]">💳</span>
                      Partial Payment
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">$200.00</td>
                  <td className="py-4 px-6 text-slate-400 text-xs">Oct 23, 2023</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded-full uppercase tracking-wider">Completed</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4 mx-auto" /></button>
                  </td>
                </tr>

                {/* Item 3 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">AH</div>
                    <span className="font-bold text-slate-800">Abdi Hassan</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                      <span className="w-3 h-3 rounded-full border border-emerald-600 flex items-center justify-center text-[9px] font-extrabold">+</span>
                      New Debt
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">$50.00</td>
                  <td className="py-4 px-6 text-slate-400 text-xs">Oct 23, 2023</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold text-orange-600 bg-orange-50 rounded-full uppercase tracking-wider">Pending</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4 mx-auto" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200/60 px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-2 mt-12">
        <div>
          <span>DebtTracker</span> © 2024 DebtTracker Fintech. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}