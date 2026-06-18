export const getToken = () => localStorage.getItem("token");

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(path, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value || 0);

export const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const statusLabel = (status) => {
  const map = {
    pending: "PENDING",
    partial: "PARTIAL",
    paid: "PAID",
  };
  return map[status] || status?.toUpperCase() || "PENDING";
};

export const statusClass = (status) => {
  if (status === "paid") return "bg-emerald-100 text-emerald-700";
  if (status === "partial") return "bg-indigo-100 text-indigo-700";
  return "bg-red-100 text-red-600";
};
