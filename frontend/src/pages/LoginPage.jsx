import  { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { loginUser } from "../auth/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
    const [formError, setFormError] = useState("");

// const {loading , error,user,token} = useSelector((state) => state.auth);
const { loading ,error: reduxError, user, } = useSelector(
  (state) => state.auth
);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Fadlan buuxi dhammaan meelaha.');
      return;
    }
    setFormError("");
    dispatch(loginUser(
      {
        username: formData.username,
        password: formData.password
      }
    ));
  };
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
            
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-emerald-300 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
            <span className="text-3xl font-black text-white">XD</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Soo dhowow</h1>
        </div>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Username" 
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-emerald-500 outline-none"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-emerald-500 outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition">
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Ma haysatid account? <Link to="/signup" className="text-emerald-400 font-bold hover:underline">Is diiwaangeli</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


























