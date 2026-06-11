import { 
  Users, 
  UserX, 
  Banknote, 
  Plus, 
  Search, 
  Eye, 
  Pencil, 
  Trash2, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

const customerData = [
  { id: 1, name: "Ahmed Mohamed", joined: "Oct 12, 2023", phone: "+252 61 555 0101", totalDebt: "$1,450.00", balance: "$820.00", initials: "AM", color: "bg-blue-100 text-blue-600", balanceColor: "text-red-600" },
  { id: 2, name: "Fatima Hassan", joined: "Nov 04, 2023", phone: "+252 61 555 0202", totalDebt: "$3,200.00", balance: "$0.00", initials: "FH", color: "bg-violet-100 text-violet-600", balanceColor: "text-emerald-600" },
  { id: 3, name: "Omar Yusuf", joined: "Jan 20, 2024", phone: "+252 61 555 0303", totalDebt: "$500.00", balance: "$450.00", initials: "OY", color: "bg-emerald-100 text-emerald-600", balanceColor: "text-red-600" },
  { id: 4, name: "Abdi Ibrahim", joined: "Feb 02, 2024", phone: "+252 61 555 0404", totalDebt: "$12,400.00", balance: "$5,100.00", initials: "AI", color: "bg-slate-200 text-slate-600", balanceColor: "text-red-600" },
];

export default function CustomersUI() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500 text-sm">Manage your business clients and their debt status.</p>
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Customers", value: "1,284", icon: <Users className="text-blue-600" />, bg: "bg-blue-50" },
          { label: "Active Debtors", value: "412", icon: <UserX className="text-red-500" />, bg: "bg-red-50" },
          { label: "Recovered Today", value: "$2,450", icon: <Banknote className="text-emerald-600" />, bg: "bg-emerald-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h2>
            </div>
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] uppercase text-slate-400 font-bold border-b border-slate-100">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone Number</th>
                <th className="px-6 py-4">Total Debt</th>
                <th className="px-6 py-4">Remaining Balance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customerData.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${customer.color}`}>
                        {customer.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{customer.name}</p>
                        <p className="text-[10px] text-slate-400">Joined {customer.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{customer.totalDebt}</td>
                  <td className={`px-6 py-4 text-sm font-bold ${customer.balanceColor}`}>{customer.balance}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Showing 1 to 4 of 1,284 customers</p>
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-800 text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold">32</button>
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
