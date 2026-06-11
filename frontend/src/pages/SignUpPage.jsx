import  { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { registerUser } from "../auth/authSlice";
import {useNavigate} from "react-router-dom";
const SignUpPage = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    username: '', 
    email: '', 
    phone: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
    const [formError, setFormError] = useState("");

const { loading ,error: reduxError, user, } = useSelector(
  (state) => state.auth
);
const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation fudud
    if (!formData.fullName || !formData.phone) {
      setError('Fadlan buuxi magaca iyo taleefanka.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password-ku waa inuu ka badan yahay 6 xaraf.');
      return;
    }
    
    setError('');
    console.log("SignUp Data:", formData);
    dispatch(registerUser({
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    }));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard"); // Haddii diiwaangelintu guulaysato, u gudub bogga guriga
    }

  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl">
      <div className="text-center mb-2">
            
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-emerald-300 rounded-2xl mx-auto flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/20">
            <span className="text-3xl font-black text-white">XD</span>
          </div>
          {/* <h1 className="text-2xl font-bold text-white">Soo dhowow</h1> */}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Account Cusub</h2>
        
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-2">
          <input 
            placeholder="Full Name" 
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-emerald-500" 
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
          <input 
            placeholder="Username" 
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-emerald-500" 
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input 
            type="email" placeholder="Email" 
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-emerald-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="tel" placeholder="Phone Number" 
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-emerald-500"
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-emerald-500"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition">
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Horay u diiwaangashatay? <Link to="/" className="text-emerald-400 font-bold hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;