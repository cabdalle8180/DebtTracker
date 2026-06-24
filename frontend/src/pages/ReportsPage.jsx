import { useEffect, useState } from "react";
import { BarChart3, Download } from "lucide-react";
import { apiFetch, formatCurrency } from "../utils/api";

export default function ReportsPage() {
  const [debts, setDebts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [debtData, paymentData] = await Promise.all([
          apiFetch("/api/debts"),
          apiFetch("/api/payments"),
        ]);
        setDebts(debtData.debts || []);
        setPayments(paymentData.payments || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalDebt = debts.reduce((s, d) => s + Number(d.amount || 0), 0);
  const totalCollected = payments.reduce((s, p) => s + Number(p.amount || 0), 0);
  const totalOutstanding = debts.reduce((s, d) => s + Number(d.remainingAmount || 0), 0);
  const paidCount = debts.filter((d) => d.status === "paid").length;
  const pendingCount = debts.filter((d) => d.status === "pending").length;
  const partialCount = debts.filter((d) => d.status === "partial").length;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-emerald-600" />
            Reports
          </h1>
          <p className="text-slate-500 text-sm mt-1">Summary of debts and collections.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading reports...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Debt Issued</p>
            <h2 className="text-2xl font-black text-slate-900 mt-2">{formatCurrency(totalDebt)}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Collected</p>
            <h2 className="text-2xl font-black text-emerald-700 mt-2">{formatCurrency(totalCollected)}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Outstanding Balance</p>
            <h2 className="text-2xl font-black text-red-700 mt-2">{formatCurrency(totalOutstanding)}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Paid Debts</p>
            <h2 className="text-2xl font-black text-slate-900 mt-2">{paidCount}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Partial Debts</p>
            <h2 className="text-2xl font-black text-indigo-700 mt-2">{partialCount}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Pending Debts</p>
            <h2 className="text-2xl font-black text-orange-600 mt-2">{pendingCount}</h2>
          </div>
        </div>
      )}
    </div>
  );
}
