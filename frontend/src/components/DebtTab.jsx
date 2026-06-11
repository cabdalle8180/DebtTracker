
import { 
  Plus, 
  TrendingUp, 
  ChevronDown, 
  Calendar, 
  Check, 
  History, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

const ledgerData = [
  { id: 1, name: "Abdi Osman", date: "Oct 24, 2023", ref: "#INV-9021", amount: "$1,200.00", balance: "$1,200.00", status: "UNPAID", initials: "AO", color: "bg-blue-50 text-blue-600", balanceColor: "text-red-600", statusBg: "bg-red-50 text-red-500", actionIcon: <Check className="w-4 h-4 text-emerald-600" /> },
  { id: 2, name: "Zahra Farah", date: "Oct 22, 2023", ref: "#INV-8834", amount: "$850.00", balance: "$350.00", status: "PARTIAL", initials: "ZF", color: "bg-indigo-50 text-indigo-600", balanceColor: "text-blue-600", statusBg: "bg-indigo-50 text-indigo-600", actionIcon: <Check className="w-4 h-4 text-emerald-600" /> },
  { id: 3, name: "Mohamed Ali", date: "Oct 20, 2023", ref: "#INV-8712", amount: "$450.00", balance: "$0.00", status: "PAID", initials: "MA", color: "bg-slate-100 text-slate-600", balanceColor: "text-emerald-600", statusBg: "bg-emerald-50 text-emerald-600", actionIcon: <History className="w-4 h-4 text-slate-400" /> },
];

export default function DebtTab() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Debt Ledger</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track all outstanding store credit.</p>
        </div>
        <button className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Add New Debt
        </button>
      </div>

      {/* Top Section: Summary Stat + Filter Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Outstanding Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-slate-500 text-sm font-medium">
              <span>Total Outstanding</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">$12,450.00</h2>
          </div>
          <div className="mt-4">
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md">
              +4.5% vs last week
            </span>
          </div>
        </div>

        {/* Filter Selection Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm lg:col-span-3 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          {/* Status Dropdown */}
          <div>
            <label className="block text-slate-500 text-xs font-semibold mb-2">Status</label>
            <div className="relative">
              <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all pr-10">
                <option>All Statuses</option>
                <option>Unpaid</option>
                <option>Partial</option>
                <option>Paid</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Customer Dropdown */}
          <div>
            <label className="block text-slate-500 text-xs font-semibold mb-2">Customer</label>
            <div className="relative">
              <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all pr-10">
                <option>All Customers</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Date Range Input */}
          <div>
            <label className="block text-slate-500 text-xs font-semibold mb-2">Date Range</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="mm/dd/yyyy"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all pr-10"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Reset Action Button */}
          <div>
            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 rounded-xl transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Debt Ledger Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 bg-slate-50/50">
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Reference</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Balance</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ledgerData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Customer Identity */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs tracking-wider ${row.color}`}>
                        {row.initials}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{row.name}</span>
                    </div>
                  </td>
                  {/* Issue Date */}
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{row.date}</td>
                  {/* Reference ID */}
                  <td className="px-6 py-4 text-sm text-slate-400 font-medium">{row.ref}</td>
                  {/* Full Amount */}
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{row.amount}</td>
                  {/* Remainder Balance */}
                  <td className={`px-6 py-4 text-sm font-bold ${row.balanceColor}`}>{row.balance}</td>
                  {/* Condition State Flag */}
                  <td className="px-6 py-4">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider ${row.statusBg}`}>
                      {row.status}
                    </span>
                  </td>
                  {/* Inline Action Triggers */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end items-center gap-3">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        {row.actionIcon}
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Controls */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-400 font-medium">Showing 3 of 152 entries</p>
          <div className="flex items-center gap-3">
            <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-slate-800">Page 1 of 51</span>
            <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}