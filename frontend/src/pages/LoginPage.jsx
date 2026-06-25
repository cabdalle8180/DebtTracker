import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/api";

const LoginPage = () => {
  // All hooks first!
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, error: reduxError } = useSelector(
    (state) => state.auth
  );
  const token = getToken();

  useEffect(() => {
    if (user){
      navigate("/dashboard")
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      return;
    }

    dispatch(loginUser(formData));
  };

  // Check if user is already logged in
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">XD</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Login</h1>
        </div>

        {/* ERROR */}
        {reduxError && (
          <p className="text-red-400 text-center mb-4">
            {reduxError}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* USERNAME */}
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* LINK */}
        <div className="mt-6 text-center text-sm text-slate-400">
          Ma haysatid account?{" "}
          <Link to="/signup" className="text-emerald-400 font-bold">
            Is diiwaangeli
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;