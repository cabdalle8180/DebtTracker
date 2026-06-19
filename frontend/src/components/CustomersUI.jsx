import { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  MapPin,
  Phone,
  Wallet,
  Mail,
  MessageSquare,
  AlertTriangle,
  Star,
  Eye,
  Info,
  Calendar,
  CreditCard,
  FileText,
} from "lucide-react";
import { apiFetch, formatCurrency, formatDate, statusClass, statusLabel } from "../utils/api";

const STATUS_STYLES = {
  active: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  blocked: "bg-red-100 text-red-700",
};

const FEEDBACK_TYPES = [
  { value: "feedback", label: "General Feedback" },
  { value: "complaint", label: "Complaint" },
  { value: "praise", label: "Praise" },
  { value: "note", label: "Internal Note" },
];

const emptyForm = {
  name: "",
  phone: "",
  address: "",
  email: "",
  importantInfo: "",
  customerStatus: "active",
  satisfactionRating: "",
};

export default function CustomersUI() {
  const [customers, setCustomers] = useState([]);
  const [debts, setDebts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [feedbackForm, setFeedbackForm] = useState({
    message: "",
    type: "feedback",
    rating: "",
  });

  const fetchCustomers = async () => {
    try {
      const data = await apiFetch("/api/customers");
      setCustomers(data.customers || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDebts = async () => {
    try {
      const data = await apiFetch("/api/debts");
      setDebts(data.debts || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await apiFetch("/api/payments");
      setPayments(data.payments || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchDebts();
    fetchPayments();
  }, []);

  const totalRemainingAmount = debts.reduce(
    (sum, debt) => sum + Number(debt.remainingAmount || 0),
    0
  );

  const attentionCount = customers.filter(
    (c) => c.customerStatus === "warning" || c.customerStatus === "blocked"
  ).length;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (customer = null) => {
    if (customer) {
      setIsEditing(true);
      setCurrentId(customer._id);
      setForm({
        name: customer.name || "",
        phone: customer.phone || "",
        address: customer.address || "",
        email: customer.email || "",
        importantInfo: customer.importantInfo || "",
        customerStatus: customer.customerStatus || "active",
        satisfactionRating: customer.satisfactionRating || "",
      });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setForm(emptyForm);
    }
    setShowModal(true);
  };

  const openDetail = (customer) => {
    setSelectedCustomer(customer);
    setFeedbackForm({ message: "", type: "feedback", rating: "" });
    setShowDetail(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `/api/customers/${currentId}` : "/api/customers";
    const method = isEditing ? "PUT" : "POST";

    try {
      await apiFetch(url, {
        method,
        body: JSON.stringify({
          ...form,
          satisfactionRating: form.satisfactionRating
            ? Number(form.satisfactionRating)
            : null,
        }),
      });
      await fetchCustomers();
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    try {
      const updated = await apiFetch(
        `/api/customers/${selectedCustomer._id}/feedback`,
        {
          method: "POST",
          body: JSON.stringify({
            message: feedbackForm.message,
            type: feedbackForm.type,
            rating: feedbackForm.rating ? Number(feedbackForm.rating) : undefined,
          }),
        }
      );
      setSelectedCustomer(updated);
      setCustomers((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );
      setFeedbackForm({ message: "", type: "feedback", rating: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await apiFetch(`/api/customers/${id}`, { method: "DELETE" });
      setCustomers(customers.filter((c) => c._id !== id));
      if (selectedCustomer?._id === id) setShowDetail(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const getCustomerDebts = (customerId) =>
    debts.filter((debt) => {
      const debtCustomerId =
        typeof debt.customerId === "object"
          ? debt.customerId?._id
          : debt.customerId;
      return debtCustomerId === customerId;
    });

  const getCustomerPayments = (customerId) =>
    payments.filter((payment) => {
      const paymentCustomerId =
        typeof payment.customerId === "object"
          ? payment.customerId?._id
          : payment.customerId;
      return paymentCustomerId === customerId;
    });

  const filteredCustomers = customers.filter((customer) => {
    const q = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(q) ||
      customer.phone.includes(searchQuery) ||
      (customer.email && customer.email.toLowerCase().includes(q)) ||
      (customer.importantInfo && customer.importantInfo.toLowerCase().includes(q))
    );
  });

  const renderStars = (rating) => {
    if (!rating) return <span className="text-slate-400 text-xs">No rating</span>;
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`w-3.5 h-3.5 ${
              n <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Customers
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage clients, feedback, and important business notes.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase">Total Customers</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {customers.length}
            </h2>
          </div>
          <Users className="w-10 h-10 text-blue-500" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase">Remaining Debt</p>
            <h2 className="text-2xl sm:text-3xl font-black text-red-700 mt-1">
              {formatCurrency(totalRemainingAmount)}
            </h2>
          </div>
          <Wallet className="w-10 h-10 text-red-500" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase">Needs Attention</p>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
              {attentionCount}
            </h2>
          </div>
          <AlertTriangle className="w-10 h-10 text-amber-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, phone, email, or notes..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400">
                <th className="px-6 py-4">Customer</th>
                <th className="px-4 py-4">Contact</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Rating</th>
                <th className="px-4 py-4 text-right">Remaining</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => {
                  const customerDebts = getCustomerDebts(customer._id);
                  const remainingAmount = customerDebts.reduce(
                    (sum, d) => sum + Number(d.remainingAmount || 0),
                    0
                  );
                  const hasNotes = customer.importantInfo || customer.feedbackLog?.length > 0;

                  return (
                    <tr key={customer._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openDetail(customer)}
                          className="flex items-center gap-3 text-left group"
                        >
                          <div className="w-10 h-10 bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center">
                            {customer.name?.charAt(0).toUpperCase() || "C"}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-emerald-600">
                              {customer.name}
                            </p>
                            {hasNotes && (
                              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                <Info className="w-3 h-3" />
                                Has notes / feedback
                              </p>
                            )}
                          </div>
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <p className="flex items-center gap-1.5 font-mono text-xs">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {customer.phone}
                          </p>
                          {customer.email && (
                            <p className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Mail className="w-3 h-3" />
                              {customer.email}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                            STATUS_STYLES[customer.customerStatus] || STATUS_STYLES.active
                          }`}
                        >
                          {customer.customerStatus || "active"}
                        </span>
                      </td>
                      <td className="px-4 py-4">{renderStars(customer.satisfactionRating)}</td>
                      <td className="px-4 py-4 text-right font-semibold text-red-700">
                        {formatCurrency(remainingAmount)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => openDetail(customer)}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openModal(customer)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(customer._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-bold text-slate-900">
                {isEditing ? "Edit Customer" : "Add New Customer"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name *</label>
                  <input required name="name" value={form.name} onChange={handleChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone *</label>
                  <input required name="phone" value={form.phone} onChange={handleChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Address</label>
                <input name="address" value={form.address} onChange={handleChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Important Information</label>
                <textarea
                  name="importantInfo"
                  rows="3"
                  placeholder="Payment terms, credit limits, reminders, special agreements..."
                  value={form.importantInfo}
                  onChange={handleChange}
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Account Status</label>
                  <select name="customerStatus" value={form.customerStatus} onChange={handleChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm">
                    <option value="active">Active</option>
                    <option value="warning">Warning</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Satisfaction (1-5)</label>
                  <select name="satisfactionRating" value={form.satisfactionRating} onChange={handleChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm">
                    <option value="">Not rated</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-xl text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold">
                  {isEditing ? "Save Changes" : "Create Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Detail Panel */}
      {showDetail && selectedCustomer && (() => {
        const customerDebts = getCustomerDebts(selectedCustomer._id);
        const customerPayments = getCustomerPayments(selectedCustomer._id);
        const totalCustomerDebt = customerDebts.reduce((sum, d) => sum + Number(d.amount || 0), 0);
        const totalCustomerPaid = customerDebts.reduce((sum, d) => sum + Number(d.paidAmount || 0), 0);
        const totalCustomerRemaining = customerDebts.reduce((sum, d) => sum + Number(d.remainingAmount || 0), 0);

        return (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
            <div className="bg-white w-full max-w-lg h-full shadow-xl overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900">Customer Profile</h2>
                <button onClick={() => setShowDetail(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Header */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 font-bold text-xl rounded-2xl flex items-center justify-center">
                    {selectedCustomer.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedCustomer.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${STATUS_STYLES[selectedCustomer.customerStatus]}`}>
                      {selectedCustomer.customerStatus}
                    </span>
                  </div>
                </div>

                {/* Section: Contact Details */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Contact Info</p>
                  <div className="grid grid-cols-1 gap-2.5 text-sm">
                    <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="font-mono text-xs">{selectedCustomer.phone}</span>
                    </div>
                    {selectedCustomer.email && (
                      <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-xs">{selectedCustomer.email}</span>
                      </div>
                    )}
                    {selectedCustomer.address && (
                      <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-xs">{selectedCustomer.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section: Satisfaction Rating */}
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Satisfaction Rating</p>
                  {renderStars(selectedCustomer.satisfactionRating)}
                </div>

                {/* Section: Important Information */}
                {selectedCustomer.importantInfo && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <p className="text-[10px] font-black text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      Important Information
                    </p>
                    <p className="text-sm text-amber-900 leading-relaxed">{selectedCustomer.importantInfo}</p>
                  </div>
                )}

                {/* Section: Financial Summary */}
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">Financial Overview</p>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Debt</p>
                      <p className="text-xs font-black text-slate-800 mt-1">{formatCurrency(totalCustomerDebt)}</p>
                    </div>
                    <div className="bg-emerald-50/50 border border-emerald-100/50 p-3 rounded-xl text-center">
                      <p className="text-[9px] font-bold text-emerald-700/80 uppercase tracking-wider">Total Paid</p>
                      <p className="text-xs font-black text-emerald-600 mt-1">{formatCurrency(totalCustomerPaid)}</p>
                    </div>
                    <div className="bg-red-50/50 border border-red-100/50 p-3 rounded-xl text-center">
                      <p className="text-[9px] font-bold text-red-700/80 uppercase tracking-wider">Remaining</p>
                      <p className="text-xs font-black text-red-600 mt-1">{formatCurrency(totalCustomerRemaining)}</p>
                    </div>
                  </div>
                </div>

                {/* Section: Debts Log */}
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Debts Log ({customerDebts.length})
                  </p>
                  {customerDebts.length === 0 ? (
                    <div className="text-center py-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <p className="text-xs text-slate-400 font-medium">No debts recorded.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {customerDebts.map((debt) => (
                        <div key={debt._id} className="border border-slate-100 rounded-xl p-3 bg-white hover:bg-slate-50/50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-xs font-bold text-slate-800">{debt.description}</h4>
                              {debt.ref && (
                                <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded mt-1 inline-block">
                                  Ref: {debt.ref}
                                </span>
                              )}
                            </div>
                            <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${statusClass(debt.status)}`}>
                              {statusLabel(debt.status)}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-[10px] border-t border-slate-50 pt-2 mt-2">
                            <div>
                              <span className="text-slate-400 text-[9px]">Original</span>
                              <p className="font-semibold text-slate-700">{formatCurrency(debt.amount)}</p>
                            </div>
                            <div>
                              <span className="text-slate-400 text-[9px]">Paid</span>
                              <p className="font-semibold text-emerald-600">{formatCurrency(debt.paidAmount)}</p>
                            </div>
                            <div>
                              <span className="text-slate-400 text-[9px]">Remaining</span>
                              <p className="font-bold text-red-600">{formatCurrency(debt.remainingAmount)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-[9px] text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(debt.date || debt.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section: Payments Log */}
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5" />
                    Payments Log ({customerPayments.length})
                  </p>
                  {customerPayments.length === 0 ? (
                    <div className="text-center py-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <p className="text-xs text-slate-400 font-medium">No payments recorded.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {customerPayments.map((payment) => (
                        <div key={payment._id} className="border border-slate-100 rounded-xl p-2.5 bg-white flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                          <div className="space-y-0.5">
                            <p className="text-[11px] font-bold text-slate-800">
                              {payment.debtId?.description ? `Payment for ${payment.debtId.description}` : "Payment received"}
                            </p>
                            <div className="flex items-center gap-1 text-[9px] text-slate-400">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{formatDate(payment.paymentDate || payment.createdAt)}</span>
                            </div>
                          </div>
                          <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                            +{formatCurrency(payment.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section: Feedback & Notes History */}
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Feedback & Notes History ({selectedCustomer.feedbackLog?.length || 0})
                  </p>
                  {(selectedCustomer.feedbackLog || []).length === 0 ? (
                    <div className="text-center py-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <p className="text-xs text-slate-400 font-medium">No feedback recorded yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                      {selectedCustomer.feedbackLog.map((entry, i) => (
                        <div key={i} className="border border-slate-100 rounded-xl p-3">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[9px] font-bold text-slate-500 uppercase">{entry.type}</span>
                            <span className="text-[9px] text-slate-400">{formatDate(entry.createdAt)}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">{entry.message}</p>
                          {entry.rating && <div className="mt-1">{renderStars(entry.rating)}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Feedback Form */}
                <form onSubmit={handleFeedbackSubmit} className="border-t border-slate-100 pt-4 space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Add Feedback / Note</p>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={feedbackForm.type}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, type: e.target.value })}
                      className="border border-slate-200 p-2 rounded-xl text-xs"
                    >
                      {FEEDBACK_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <select
                      value={feedbackForm.rating}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, rating: e.target.value })}
                      className="border border-slate-200 p-2 rounded-xl text-xs"
                    >
                      <option value="">Optional rating</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    required
                    rows="2"
                    placeholder="Customer feedback, complaints, praise, or internal notes..."
                    value={feedbackForm.message}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                    className="w-full border border-slate-200 p-2.5 rounded-xl text-xs resize-none"
                  />
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-semibold">
                    Save Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}




































































