import {
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  X,
  Trash2,
  Edit2,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { apiFetch, formatCurrency, formatDate, statusLabel, statusClass } from "../utils/api";

export default function DebtTab() {
  const [debts, setDebts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentForm, setPaymentForm] = useState({ debtId: "", amount: "" });
  const itemsPerPage = 8;

  const [formData, setFormData] = useState({
    customerId: "",
    date: new Date().toISOString().split("T")[0],
    ref: "",
    description: "",
    amount: "",
  });

  const fetchDebts = async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/debts");
      setDebts(data.debts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await apiFetch("/api/customers");
      setCustomers(data.customers || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDebts();
    fetchCustomers();
  }, []);

  const totalOutstanding = debts.reduce((sum, item) => sum + (item.remainingAmount || 0), 0);

  const openModal = (debt = null) => {
    if (debt) {
      setEditingDebt(debt);
      setFormData({
        customerId: debt.customerId?._id || debt.customerId || "",
        date: debt.date ? new Date(debt.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        ref: debt.ref || "",
        description: debt.description || "",
        amount: debt.amount || "",
      });
    } else {
      setEditingDebt(null);
      setFormData({
        customerId: "",
        date: new Date().toISOString().split("T")[0],
        ref: `#INV-${Math.floor(1000 + Math.random() * 9000)}`,
        description: "",
        amount: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingDebt ? "PUT" : "POST";
    const url = editingDebt ? `/api/debts/${editingDebt._id}` : "/api/debts";

    try {
      await apiFetch(url, {
        method,
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
        }),
      });
      setIsModalOpen(false);
      fetchDebts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this debt?")) return;
    try {
      await apiFetch(`/api/debts/${id}`, { method: "DELETE" });
      fetchDebts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleMarkAsPaid = async (debt) => {
    try {
      await apiFetch(`/api/debts/${debt._id}`, {
        method: "PUT",
        body: JSON.stringify({ status: "paid" }),
      });
      fetchDebts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch("/api/payments", {
        method: "POST",
        body: JSON.stringify({
          debtId: paymentForm.debtId,
          amount: Number(paymentForm.amount),
        }),
      });
      setIsPaymentModalOpen(false);
      setPaymentForm({ debtId: "", amount: "" });
      fetchDebts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleResetFilters = () => {
    setStatusFilter("all");
    setCustomerFilter("all");
    setDateFilter("");
    setGlobalSearch("");
    setCurrentPage(1);
  };

  const filteredDebts = debts.filter((debt) => {
    const customerName = debt.customerId?.name || "";
    const matchesSearch =
      customerName.toLowerCase().includes(globalSearch.toLowerCase()) ||
      (debt.ref && debt.ref.toLowerCase().includes(globalSearch.toLowerCase())) ||
      (debt.description && debt.description.toLowerCase().includes(globalSearch.toLowerCase()));
    const matchesStatus = statusFilter === "all" || debt.status === statusFilter;
    const matchesCustomer =
      customerFilter === "all" || debt.customerId?._id === customerFilter;
    const debtDate = debt.date || debt.createdAt;
    const matchesDate =
      !dateFilter || (debtDate && new Date(debtDate).toISOString().startsWith(dateFilter));
    return matchesSearch && matchesStatus && matchesCustomer && matchesDate;
  });

  const totalPages = Math.ceil(filteredDebts.length / itemsPerPage) || 1;
  const currentItems = filteredDebts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const unpaidDebts = debts.filter((d) => d.status !== "paid" && d.remainingAmount > 0);
  const selectedPaymentDebt = unpaidDebts.find((d) => d._id === paymentForm.debtId);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-slate-200">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search debts, customers..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Record Payment
          </button>
          <button
            onClick={() => openModal()}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add New Debt
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Debt Ledger</h1>
        <p className="text-slate-500 text-sm mt-1">Manage and track all outstanding store credit.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-500 text-sm font-medium">Total Outstanding</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{formatCurrency(totalOutstanding)}</div>
        </div>

        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Customer</label>
            <select
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Customers</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={handleResetFilters}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm py-2 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Balance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">Loading...</td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">No debts found.</td>
                </tr>
              ) : (
                currentItems.map((row) => (
                  <tr key={row._id} className="hover:bg-slate-50 text-sm">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center">
                          {(row.customerId?.name || "CU").slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-900">{row.customerId?.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{formatDate(row.date || row.createdAt)}</td>
                    <td className="px-6 py-4 font-mono text-slate-500 text-xs">{row.ref || "-"}</td>
                    <td className="px-6 py-4 font-semibold">{formatCurrency(row.amount)}</td>
                    <td className="px-6 py-4 font-bold text-red-600">{formatCurrency(row.remainingAmount)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-0.5 rounded font-bold ${statusClass(row.status)}`}>
                        {statusLabel(row.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {row.status !== "paid" && (
                          <button onClick={() => handleMarkAsPaid(row)} title="Mark as paid" className="p-1 hover:bg-slate-100 rounded text-emerald-700">
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => openModal(row)} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(row._id)} className="p-1 hover:bg-red-50 rounded text-red-600">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center px-6 py-4 border-t border-slate-200 text-sm text-slate-500">
          <div>Showing {currentItems.length} of {filteredDebts.length} entries</div>
          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-1 border rounded disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-1 border rounded disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="font-bold">{editingDebt ? "Edit Debt" : "New Debt"}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Customer *</label>
                <select
                  required
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select Customer</option>
                  {customers.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Amount ($) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Description *</label>
                <textarea
                  required
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Reference</label>
                  <input
                    type="text"
                    value={formData.ref}
                    onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="font-bold">Record Payment</h3>
              <button onClick={() => setIsPaymentModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Debt *</label>
                <select
                  required
                  value={paymentForm.debtId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, debtId: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select debt</option>
                  {unpaidDebts.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.customerId?.name} — {formatCurrency(d.remainingAmount)} left
                    </option>
                  ))}
                </select>
              </div>
              {selectedPaymentDebt && (
                <p className="text-xs text-slate-500">Balance: {formatCurrency(selectedPaymentDebt.remainingAmount)}</p>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Amount ($) *</label>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  max={selectedPaymentDebt?.remainingAmount}
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-semibold">Save Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
