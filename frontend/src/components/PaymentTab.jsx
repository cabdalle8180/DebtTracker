import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  X,
  CreditCard,
  Wallet,
  CheckCircle,
} from "lucide-react";
import { formatCurrency, formatDate } from "../utils/api";
import { paymentService } from "../services/paymentService";
import { debtService } from "../services/debtService";

export default function PaymentTab() {
  const [payments, setPayments] = useState([]);
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ debtId: "", amount: "" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [payments, debts] = await Promise.all([
        paymentService.getAll(),
        debtService.getAll(),
      ]);
      setPayments(payments);
      setDebts(
        debts.filter(
          (d) => d.status !== "paid" && d.remainingAmount > 0
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [paymentsData, debtsData] = await Promise.all([
          paymentService.getAll(),
          debtService.getAll(),
        ]);
        setPayments(paymentsData);
        setDebts(debtsData.filter((d) => d.status !== "paid" && d.remainingAmount > 0));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalCollected = payments.reduce((s, p) => s + Number(p.amount || 0), 0);
  const todayTotal = payments
    .filter((p) => {
      const d = new Date(p.paymentDate || p.createdAt);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    })
    .reduce((s, p) => s + Number(p.amount || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await paymentService.create({
        debtId: form.debtId,
        amount: Number(form.amount),
      });
      setShowModal(false);
      setForm({ debtId: "", amount: "" });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const selectedDebt = debts.find((d) => d._id === form.debtId);

  const filtered = payments.filter((p) => {
    const name = p.customerId?.name || "";
    const desc = p.debtId?.description || "";
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  });

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payments</h1>
          <p className="text-slate-500 text-sm mt-1">Record and track customer payments.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all"
        >
          <Plus className="w-4 h-4" />
          Record Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Total Collected</p>
            <h2 className="text-2xl font-black text-emerald-700 mt-1">{formatCurrency(totalCollected)}</h2>
          </div>
          <Wallet className="w-8 h-8 text-emerald-500" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Today&apos;s Payments</p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(todayTotal)}</h2>
          </div>
          <CheckCircle className="w-8 h-8 text-blue-500" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Total Transactions</p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{payments.length}</h2>
          </div>
          <CreditCard className="w-8 h-8 text-violet-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search payments..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400">
                <th className="px-6 py-4">Customer</th>
                <th className="px-4 py-4">Debt</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-4 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-400">Loading...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-400">No payments found.</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {p.customerId?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {p.debtId?.description || "-"}
                    </td>
                    <td className="px-4 py-4 font-bold text-emerald-700">
                      {formatCurrency(p.amount)}
                    </td>
                    <td className="px-4 py-4 text-slate-500">
                      {formatDate(p.paymentDate || p.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-slate-100">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Record Payment</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Select Debt *</label>
                <select
                  required
                  value={form.debtId}
                  onChange={(e) => setForm({ ...form, debtId: e.target.value })}
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-sm"
                >
                  <option value="">Choose unpaid debt</option>
                  {debts.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.customerId?.name} — {d.description} ({formatCurrency(d.remainingAmount)} left)
                    </option>
                  ))}
                </select>
              </div>
              {selectedDebt && (
                <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                  Remaining balance: <strong>{formatCurrency(selectedDebt.remainingAmount)}</strong>
                </p>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Amount ($) *</label>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  max={selectedDebt?.remainingAmount || undefined}
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold"
                >
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
