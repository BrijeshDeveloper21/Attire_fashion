import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Globe, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Guest User', email });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-12">
          <img src="/LOGO.png" alt="Attire Logo" className="h-12 mx-auto mb-8" />
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest">Sign in to your premium account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              required
              className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white px-12 py-4 rounded-sm outline-none transition-all font-medium"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              required
              className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white px-12 py-4 rounded-sm outline-none transition-all font-medium"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-5 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-sm hover:bg-brand-gold transition-colors group shadow-xl"
          >
            Sign In
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-12">
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-full h-px bg-gray-100" />
            <span className="absolute bg-white px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Or Continue With</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 border-2 border-gray-50 py-4 hover:border-black transition-all font-bold uppercase tracking-widest text-[10px]">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 border-2 border-gray-50 py-4 hover:border-black transition-all font-bold uppercase tracking-widest text-[10px]">
              <Globe className="w-5 h-5 text-black" />
              Social
            </button>
          </div>
        </div>

        <p className="mt-12 text-center text-sm font-medium text-gray-500">
          Don't have an account? {' '}
          <Link to="/signup" className="text-black font-black uppercase tracking-widest border-b-2 border-brand-gold pb-0.5 ml-1">
            Create One
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
