import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  MapPin,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CustomersUI() {
  const [customers, setCustomers] = useState([]);
  const [debts, setDebts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // KONTROOLKA: Kaliya xogta uu controller-kaaga aqbalo
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // ================= FETCH CUSTOMERS =================
  const fetchCustomers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Controller-kaagu wuxuu soo celiyaa { customers: [...] }

      setCustomers(data.customers || []);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };


  // debit
    const fetchDebit = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/debts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Controller-kaagu wuxuu soo celiyaa { customers: [...] }
        // console.log("RAW API DATA:", data); // 👈 IMPORTANT

      setDebts(data.debts || []);
    } catch (err) {
      console.error("Error fetching debts:", err);
    }
  };

  // useEffect wuxuu kaliya ordi doonaa marka component-ka uu mount-gareeyo, taasoo keeneysa in fetchCustomers uu ordo hal mar oo kaliya marka page-ka la furo.
  useEffect(() => {
    fetchCustomers();
    fetchDebit();
  }, []);

  
  // ================= FORM HANDLER =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= OPEN MODAL (ADD / EDIT) =================
  const openModal = (customer = null) => {
    if (customer) {
      setIsEditing(true);
      setCurrentId(customer._id);
      setForm({
        name: customer.name || "",
        phone: customer.phone || "",
        address: customer.address || "",
      });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setForm({ name: "", phone: "", address: "" });
    }
    setShowModal(true);
  };

  // ================= SUBMIT (CREATE & UPDATE) =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    const url = isEditing ? `/api/customers/${currentId}` : "/api/customers";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form), // Kaliya name, phone, iyo address ayaa u dhoofaya backend-ka
      });

      if (res.ok) {
        fetchCustomers(); 
        setShowModal(false);
      } else {
        const errData = await res.json();
        alert(errData.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  // ================= DELETE CUSTOMER =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setCustomers(customers.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  // ================= SEARCH FILTERING =================
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );
// console.log(fetchCustomers)
  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Customers</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your business clients and addresses seamlessly.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-sm shadow-emerald-200 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center transition-all hover:shadow-md max-w-xs">
          <div className="">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Total Customers
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {customers.length}
            </h2>
          </div>
          {/* total debits */}
           <div className="space-y-1 bg-amber-300">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Total Debts
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {debts.length}
            </h2>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shadow-inner">
            <Users className="text-blue-600 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* TABLE WORKSPACE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-xs uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100">
                <th className="px-6 py-4">Name</th>
                <th className="px-4 py-4">Phone</th>
                <th className="px-4 py-4">Business Address</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-slate-200 to-slate-100 text-slate-700 font-bold rounded-xl flex items-center justify-center shadow-sm">
                          {customer.name ? customer.name.charAt(0).toUpperCase() : "C"}
                        </div>
                        <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{customer.name}</p>
                      </div>
                    </td>

                    <td className="px-4 py-4 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {customer.phone}
                      </div>
                    </td>
                    
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {customer.address || "No Address"}
                      </div>
                    </td>

                    <td className="text-right px-6 py-4">
                      <div className="flex justify-end gap-1.5">
                        <button onClick={() => openModal(customer)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit Profile">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(customer._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete Profile">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TRANSITION CONTAINER */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                {isEditing ? "Modify Customer Details" : "Add New Customer"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Full Name</label>
                <input required name="name" placeholder="John Doe" value={form.name} onChange={handleChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Phone Number</label>
                <input required name="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Business Address</label>
                <input required name="address" placeholder="123 Corporate Way, Suite 10" value={form.address} onChange={handleChange} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all" />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 active:scale-95 transition-all">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-sm font-semibold transition-all shadow-sm">
                  {isEditing ? "Save Changes" : "Create Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}