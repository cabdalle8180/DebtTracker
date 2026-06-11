import {
  CreditCard,
  Users,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function OverviewTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total Debt */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-red-600" />
          </div>

          <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
            +2.4%
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

        <div className="mt-4">
          <p className="text-slate-400 text-xs uppercase">
            Total Debt
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            $12,450
          </h2>
        </div>
      </div>

      {/* Customers */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>

          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            +12
          </span>
        </div>

        <div className="mt-4">
          <p className="text-slate-400 text-xs uppercase">
            Customers
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            156
          </h2>
        </div>
      </div>

      {/* Payments */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>

          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            8 Today
          </span>
        </div>

        <div className="mt-4">
          <p className="text-slate-400 text-xs uppercase">
            Payments Today
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            $2,300
          </h2>
        </div>
      </div>

      {/* Active Debts */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-violet-600" />
          </div>

          <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded-full">
            Active
          </span>
        </div>

        <div className="mt-4">
          <p className="text-slate-400 text-xs uppercase">
            Active Debts
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            42
          </h2>
        </div>
      </div>
    </div>
  );
}