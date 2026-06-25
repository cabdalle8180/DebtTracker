import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CreditCard,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Info,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrency, formatDate, statusLabel, statusClass } from "../utils/api";
import { customerService } from "../services/customerService";
import { debtService } from "../services/debtService";
import { paymentService } from "../services/paymentService";

export default function OverviewTab() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [debts, setDebts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [customers, debts, payments] = await Promise.all([
          customerService.getAll(),
          debtService.getAll(),
          paymentService.getAll(),
        ]);
        setCustomers(customers);
        setDebts(debts);
        setPayments(payments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalOutstanding = debts.reduce((s, d) => s + Number(d.remainingAmount || 0), 0);
  const activeDebts = debts.filter((d) => d.status !== "paid").length;
  const attentionCustomers = customers.filter(
    (c) => c.customerStatus === "warning" || c.customerStatus === "blocked"
  );

  const recentFeedback = useMemo(() => {
    return customers
      .flatMap((c) =>
        (c.feedbackLog || []).map((f) => ({
          ...f,
          customerName: c.name,
          customerId: c._id,
        }))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [customers]);
  const todayPayments = payments
    .filter((p) => {
      const d = new Date(p.paymentDate || p.createdAt);
      return d.toDateString() === new Date().toDateString();
    })
    .reduce((s, p) => s + Number(p.amount || 0), 0);

  const topCustomers = useMemo(() => {
    return customers
      .map((c) => {
        const customerDebts = debts.filter(
          (d) => (d.customerId?._id || d.customerId) === c._id
        );
        const remaining = customerDebts.reduce(
          (s, d) => s + Number(d.remainingAmount || 0),
          0
        );
        return { ...c, remaining };
      })
      .filter((c) => c.remaining > 0)
      .sort((a, b) => b.remaining - a.remaining)
      .slice(0, 5);
  }, [customers, debts]);

  const chartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const month = months[d.getMonth()];
      const newDebt = debts
        .filter((debt) => {
          const dt = new Date(debt.date || debt.createdAt);
          return dt.getMonth() === d.getMonth() && dt.getFullYear() === d.getFullYear();
        })
        .reduce((s, debt) => s + Number(debt.amount || 0), 0);
      const collections = payments
        .filter((p) => {
          const dt = new Date(p.paymentDate || p.createdAt);
          return dt.getMonth() === d.getMonth() && dt.getFullYear() === d.getFullYear();
        })
        .reduce((s, p) => s + Number(p.amount || 0), 0);
      return { month, newDebt, collections };
    });
  }, [debts, payments]);

  const recentTransactions = useMemo(() => {
    const debtTx = debts.map((d) => ({
      id: d._id,
      type: "debt",
      customerName: d.customerId?.name || "Unknown",
      label: "New Debt",
      amount: d.amount,
      date: d.date || d.createdAt,
      status: d.status,
    }));
    const paymentTx = payments.map((p) => ({
      id: p._id,
      type: "payment",
      customerName: p.customerId?.name || "Unknown",
      label: "Payment",
      amount: p.amount,
      date: p.paymentDate || p.createdAt,
      status: "paid",
    }));
    return [...debtTx, ...paymentTx]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);
  }, [debts, payments]);

  if (loading) {
    return (
      <div className="p-4 sm:p-8 text-slate-400">Loading dashboard...</div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Welcome back, {user?.fullName || user?.username}. Track your business debts and payments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <CreditCard className="w-6 h-6 text-red-600 mb-3" />
          <p className="text-slate-400 text-xs uppercase font-medium">Total Outstanding</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">{formatCurrency(totalOutstanding)}</h2>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <Users className="w-6 h-6 text-blue-600 mb-3" />
          <p className="text-slate-400 text-xs uppercase font-medium">Total Customers</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">{customers.length}</h2>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <CheckCircle className="w-6 h-6 text-emerald-600 mb-3" />
          <p className="text-slate-400 text-xs uppercase font-medium">Payments Today</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">{formatCurrency(todayPayments)}</h2>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <TrendingUp className="w-6 h-6 text-violet-600 mb-3" />
          <p className="text-slate-400 text-xs uppercase font-medium">Active Debts</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">{activeDebts}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[320px]">
          <h3 className="font-bold text-slate-800 mb-4">Debt Summary Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Legend />
              <Bar dataKey="collections" name="Collections" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="newDebt" name="New Debt" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-5">Top Customers (by balance)</h3>
          <div className="space-y-4">
            {topCustomers.length === 0 ? (
              <p className="text-sm text-slate-400">No outstanding balances.</p>
            ) : (
              topCustomers.map((c) => (
                <div key={c._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center">
                      {c.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{c.name}</h4>
                      <p className="text-xs text-slate-400">{c.phone}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-red-600">{formatCurrency(c.remaining)}</span>
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => navigate("/dashboard/customers")}
            className="w-full text-center text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-4 mt-4 border-t border-slate-100"
          >
            View all customers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customers Needing Attention */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Customers Needing Attention
          </h3>
          {attentionCustomers.length === 0 ? (
            <p className="text-sm text-slate-400">All customers are in good standing.</p>
          ) : (
            <div className="space-y-3">
              {attentionCustomers.map((c) => (
                <div key={c._id} className="flex items-start justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{c.name}</p>
                    <p className="text-xs text-amber-700 uppercase font-semibold mt-0.5">
                      {c.customerStatus}
                    </p>
                    {c.importantInfo && (
                      <p className="text-xs text-slate-600 mt-1 flex items-start gap-1">
                        <Info className="w-3 h-3 mt-0.5 shrink-0" />
                        {c.importantInfo.slice(0, 80)}
                        {c.importantInfo.length > 80 ? "..." : ""}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => navigate("/dashboard/customers")}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Customer Feedback */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            Recent Customer Feedback
          </h3>
          {recentFeedback.length === 0 ? (
            <p className="text-sm text-slate-400">No feedback recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {recentFeedback.map((f, i) => (
                <div key={i} className="p-3 border border-slate-100 rounded-xl">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-slate-800">{f.customerName}</p>
                    <span className="text-xs text-slate-400">{formatDate(f.createdAt)}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{f.type}</span>
                  <p className="text-sm text-slate-600 mt-1">{f.message}</p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => navigate("/dashboard/customers")}
            className="w-full text-center text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-4 mt-4 border-t border-slate-100"
          >
            Manage customer feedback
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase bg-slate-50">
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-slate-400">No transactions yet.</td>
                </tr>
              ) : (
                recentTransactions.map((tx) => (
                  <tr key={`${tx.type}-${tx.id}`} className="hover:bg-slate-50">
                    <td className="py-4 px-6 font-bold text-slate-800">{tx.customerName}</td>
                    <td className="py-4 px-6">
                      <span className={tx.type === "payment" ? "text-blue-600" : "text-emerald-600"}>
                        {tx.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold">{formatCurrency(tx.amount)}</td>
                    <td className="py-4 px-6 text-slate-400">{formatDate(tx.date)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${statusClass(tx.status)}`}>
                        {statusLabel(tx.status)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
