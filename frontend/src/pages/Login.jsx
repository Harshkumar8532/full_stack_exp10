import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [errMsgs, setErr] = useState('');
  const { setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ email, name: 'Guest User' });
    navigate('/profile');
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 flex justify-center min-h-[70vh] items-center">
      <div className="bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border w-full max-w-md">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Login</h2>
            <p className="text-sm text-gray-500">
              or <Link to="/register" className="text-primary font-bold hover:underline">create an account</Link>
            </p>
          </div>
          <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop" className="w-16 h-16 rounded-full opacity-20 hidden sm:block" alt="login icon"/>
        </div>

        {errMsgs && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{errMsgs}</p>}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <input 
            required 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full px-4 py-4 border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-background rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm" 
          />
          <input 
            required 
            type="password" 
            placeholder="Password" 
            className="w-full px-4 py-4 border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-background rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm" 
          />
          <button type="submit" className="w-full bg-primary hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-colors uppercase tracking-wide mt-2">
            Login
          </button>
        </form>
        
        <p className="text-xs text-gray-400 mt-6 text-center leading-relaxed">
          By clicking on Login, I accept the Terms & Conditions & Privacy Policy
        </p>
      </div>
    </div>
  );
}
